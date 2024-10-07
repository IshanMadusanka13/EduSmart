import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function NearbyClassView() {
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        setLoading(false);
    };

    useEffect(() => {
        getCurrentLocation();
        
    }, []);

    useEffect(() => {
        const dummyMarkers = [
            {
                latlng: { latitude: 6.90432920244038, longitude: 79.92393787656675 },
                title: "Class A",
                description: "Description for Class A"
            },
        ];
        setMarkers(dummyMarkers);
    },[region]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }



    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
            >
                {markers.map((marker, index) => (
                    <Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                >
                    <Image
                        source={require('./../../assets/images/mapmark.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                </Marker>
                
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
