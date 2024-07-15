// LocationMap.js
import React, { useEffect, useState, useCallback } from 'react';
import {
    AdvancedMarker,
    APIProvider,
    Map,
    Pin
} from '@vis.gl/react-google-maps';
import { functions } from '../../firebase';
import { httpsCallable } from 'firebase/functions';

const defaultCenter = {
    lat: 0,
    lng: 0,
};

const LocationMap = ({className}) => {
    const [allCoordinates, setAllCoordinates] = useState([]);
    const [centerCoordinate, setCenterCoordinate] = useState(defaultCenter);

    useEffect(() => {
        const getDnsLoc = httpsCallable(functions, 'getDnsLoc');

        getDnsLoc({ url: 'party.pulse-of-the-underground.com' })
            .then(result => {
                console.log(result.data);
                const dnsData = result.data.split("\n");
                //const dnsData = "37 58 38.396 N"
                const coordinates = dnsData.map(data => parseLOC(data));
                console.log('Parsed Coordinates:', coordinates);
                setAllCoordinates(coordinates);
            })
            .catch(error => {
                console.error('Error fetching DNS LOC:', error.message);
            });
    }, []);

    useEffect(() => {
        if (allCoordinates.length > 0) {
            const center = calculateCenterCoordinate(allCoordinates);
            setCenterCoordinate(center);
        }
    }, [allCoordinates]);

    const parseLOC = useCallback((locString) => {
        const parts = locString.split(/\s+/);

        // Latitude components
        const latDegrees = parseInt(parts[0], 10);
        const latMinutes = parseInt(parts[1], 10);
        const latSeconds = parseFloat(parts[2]);
        const latDirection = parts[3]; // N or S

        // Longitude components
        const longDegrees = parseInt(parts[4], 10);
        const longMinutes = parseInt(parts[5], 10);
        const longSeconds = parseFloat(parts[6]);
        const longDirection = parts[7]; // E or W

        // Altitude (not used for coordinates)
        const altitude = parseFloat(parts[8]);

        // Convert latitude to decimal
        let latitude = latDegrees + (latMinutes / 60) + (latSeconds / 3600);
        if (latDirection === 'S') {
            latitude = -latitude;
        }

        // Convert longitude to decimal
        let longitude = longDegrees + (longMinutes / 60) + (longSeconds / 3600);
        if (longDirection === 'W') {
            longitude = -longitude;
        }

        return { lat: latitude, lng: longitude };
    }, []);

    const calculateCenterCoordinate = useCallback((coordinates) => {
        if (coordinates.length === 0) {
            return defaultCenter;
        }

        const totalLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
        const totalLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0);
        const avgLat = totalLat / coordinates.length;
        const avgLng = totalLng / coordinates.length;

        return { lat: avgLat, lng: avgLng };
    }, []);

    if(allCoordinates<1){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <div className={className}>
            <APIProvider apiKey={'AIzaSyAZiqQqQcYDgbZ3VO2QKaMfiUgEmT0B-5c'} libraries={['marker']}>
                <Map
                    mapId={'7503eb0b645b149'}
                    defaultZoom={7}
                    defaultCenter={centerCoordinate}
                >
                    {allCoordinates.map((coordinates, index) => (
                        <AdvancedMarker
                            key={index}
                            position={coordinates}
                            title={`Marker ${index + 1}`}
                        >
                            <Pin
                                background={'#22ccff'}
                                borderColor={'#1e89a1'}
                                glyphColor={'#0f677a'}
                            />
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>
        </div>
    );
};

export default LocationMap;
