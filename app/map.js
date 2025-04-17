// File: app/map.js
import React, { useRef, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Button, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';

// --- **** IMPORTANT: REPLACE WITH YOUR ORS API KEY **** ---
const ORS_API_KEY = 'YOUR_OPENROUTESERVICE_API_KEY'; // Get yours from openrouteservice.org

// --- Map Configuration ---
const mapStyleUrl = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'; // Using CARTO Positron

// --- Example Start/End Points (Hyderabad Area) ---
const startCoords = { longitude: 78.4867, latitude: 17.3850 }; // ~Hyderabad Center
const endCoords = { longitude: 78.3871, latitude: 17.4375 }; // ~HITEC City Area

// --- HTML and JavaScript for the WebView ---
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title>Map</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    
    <script src='https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.js'></script>
    <link href='https://unpkg.com/maplibre-gl@3.x/dist/maplibre-gl.css' rel='stylesheet' />
    
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>

<div id='map'></div>

<script>
    // --- Map Initialization ---
    const map = new maplibregl.Map({
        container: 'map',
        style: '${mapStyleUrl}', 
        center: [${startCoords.longitude}, ${startCoords.latitude}], // Start centered roughly
        zoom: 11 
    });
    map.addControl(new maplibregl.NavigationControl());

    // --- Function to Draw Route (Called from React Native) ---
    function drawRoute(routeGeoJSONString) {
        try {
            const routeGeoJSON = JSON.parse(routeGeoJSONString);
            
            // Remove previous route if exists
            if (map.getSource('route')) {
                map.removeLayer('route-line');
                map.removeSource('route');
            }

            // Add new route source
            map.addSource('route', {
                type: 'geojson',
                data: routeGeoJSON 
            });

            // Add layer to display the route
            map.addLayer({
                id: 'route-line',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#007AFF', // Blue color for the route
                    'line-width': 5,
                    'line-opacity': 0.8
                }
            });

            // --- Optional: Fit map bounds to the route ---
            // Calculate bounding box of the route
            const coordinates = routeGeoJSON.coordinates;
            if (coordinates && coordinates.length > 0) {
                const bounds = coordinates.reduce((bounds, coord) => {
                    return bounds.extend(coord);
                }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
                
                map.fitBounds(bounds, {
                    padding: 40 // Add some padding around the route
                });
            }

        } catch (e) {
            console.error('Error drawing route:', e);
            // Optionally send error back to React Native
            // window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'error', payload: 'Error drawing route' }));
        }
    }

    // --- Optional: Function to add markers ---
    function addMarker(lng, lat, id, color = '#FF0000') {
        const el = document.createElement('div');
        el.style.background = color;
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.borderRadius = '50%';
        el.style.border = '1px solid white';

        new maplibregl.Marker(el)
            .setLngLat([lng, lat])
            .addTo(map);
        
        // Keep track of markers if needed (e.g., to remove them later)
    }

    // Add initial markers for start/end for context
    map.on('load', () => {
      addMarker(${startCoords.longitude}, ${startCoords.latitude}, 'start', '#00FF00'); // Green for start
      addMarker(${endCoords.longitude}, ${endCoords.latitude}, 'end', '#FF0000');     // Red for end
    });


    // --- Communication back to React Native (Example) ---
    /*
    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'mapClick', payload: { lng, lat } }));
    });
    */

</script>

</body>
</html>
`;

export default function MapScreen() {
    const webViewRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- Function to Fetch Route from ORS ---
    const fetchRoute = async () => {
        if (!ORS_API_KEY || ORS_API_KEY === '5b3ce3597851110001cf62481a211254f1894c4fbc859433a1f72eac') {
            Alert.alert('API Key Missing', 'Please add your OpenRouteService API key in the code.');
            return;
        }
        setIsLoading(true);
        try {
            // ORS API endpoint for directions (using driving profile)
            const url = 'https://api.openrouteservice.org/v2/directions/driving-car'; // Or 'foot-walking', 'cycling-regular' etc.
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                    'Content-Type': 'application/json',
                    'Authorization': ORS_API_KEY // Your API key
                },
                body: JSON.stringify({
                    coordinates: [
                        [startCoords.longitude, startCoords.latitude],
                        [endCoords.longitude, endCoords.latitude]
                    ],
                    // Optional parameters:
                    // 'radiuses': [-1, -1], // Use default search radius
                    // 'alternative_routes': { 'count': 1 }, // Get only the best route
                    // 'instructions': false, // Don't need turn-by-turn instructions for drawing
                    // 'geometry': true // Ensure geometry is included (default)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`ORS API Error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();

            // Extract the route geometry (ORS provides it directly as GeoJSON)
            if (data.features && data.features.length > 0 && data.features[0].geometry) {
                const routeGeometry = data.features[0].geometry; // This is the GeoJSON LineString geometry

                 // --- Send the route to the WebView ---
                if (webViewRef.current) {
                    const geoJSONString = JSON.stringify(routeGeometry);
                    // Escape the string properly for injection
                    const script = `drawRoute(\`${geoJSONString.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`); true;`; // `true;` helps ensure execution
                    webViewRef.current.injectJavaScript(script);
                }

            } else {
                throw new Error('No route found in ORS response.');
            }

        } catch (error) {
            console.error("Error fetching route:", error);
            Alert.alert('Error', `Failed to get directions: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef} // Assign ref
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (
                  <ActivityIndicator size="large" style={styles.loadingIndicator} />
                )}
                onMessage={(event) => { // Optional: Handle messages back from WebView
                     try {
                         const message = JSON.parse(event.nativeEvent.data);
                         console.log('Message from WebView:', message);
                         // if (message.type === 'mapClick') { ... }
                     } catch (error) {
                         console.error('Error parsing message from WebView', error);
                     }
                 }}
                 onError={(syntheticEvent) => { // Handle WebView loading errors
                    const { nativeEvent } = syntheticEvent;
                    console.warn('WebView error: ', nativeEvent);
                 }}
            />
            {/* Button to trigger route calculation */}
            <View style={styles.buttonContainer}>
                <Button title="Get Directions" onPress={fetchRoute} disabled={isLoading} />
                {isLoading && <ActivityIndicator style={{ marginLeft: 10 }}/>}
            </View>
             {/* --- VERY IMPORTANT: Add OSM/ORS Attribution --- */}
            <View style={styles.attributionContainer}>
                <Text style={styles.attributionText}>Map data © OpenStreetMap contributors | Routing © OpenRouteService</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingIndicator: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center', alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: 50, // Adjust position as needed
        left: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
     attributionContainer: {
        position: 'absolute',
        bottom: 10, // Adjust position as needed
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
    },
    attributionText: {
        fontSize: 10,
        color: '#333',
    },
});