"use client";
import { useEffect, useRef, useState } from 'react';
import InfoWindowContent from './InfoWindow';
import ReactDOM from 'react-dom';

const Map = () => {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [map, setMap] = useState(null);
    const [service, setService] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [infoWindow, setInfoWindow] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [additionalInput, setAdditionalInput] = useState('');

    useEffect(() => {
        // Ensure the script only loads on the client
        if (typeof window !== 'undefined') {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
            script.async = true;

            script.onload = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(handleGeolocation, handleError);
                } else {
                    handleError();
                }
            };

            document.head.appendChild(script);

            const loadMap = (lat, lng) => {
                const mapInstance = new window.google.maps.Map(mapRef.current, {
                    center: { lat, lng },
                    zoom: 14,
                });
                setMap(mapInstance);
                const placesService = new window.google.maps.places.PlacesService(mapInstance);
                setService(placesService);

                const windowInstance = new window.google.maps.InfoWindow();
                setInfoWindow(windowInstance);
            };

            const handleGeolocation = (position) => {
                const { latitude, longitude } = position.coords;
                loadMap(latitude, longitude);
            };

            const handleError = () => {
                loadMap(25.7540, -80.3719); // FIU location as a fallback
            };

            return () => {
                document.head.removeChild(script);
            };
        }
    }, []);

    const handleSearch = (event) => {
        if (event.key === 'Enter' && inputRef.current.value && service) {
            const request = {
                query: inputRef.current.value,
                fields: ['name', 'geometry', 'place_id'],
            };

            service.textSearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    markers.forEach(marker => marker.setMap(null));
                    setMarkers([]);

                    const locations = results.slice(0, 7);
                    const newMarkers = locations.map(({ geometry, place_id }) => {
                        const location = geometry.location;
                        const marker = new window.google.maps.Marker({
                            position: location,
                            map: map,
                        });

                        marker.addListener('click', () => {
                            service.getDetails({ placeId: place_id }, (place, status) => {
                                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                    setSelectedPlace(place);
                                    infoWindow.setContent(`
                                        <div id="info-window-content"></div>
                                    `);
                                    infoWindow.open(map, marker);

                                    const infoWindowContentDiv = document.getElementById('info-window-content');
                                    if (infoWindowContentDiv) {
                                        ReactDOM.render(
                                            <InfoWindowContent 
                                                place={place} 
                                                additionalInput={additionalInput} 
                                                setAdditionalInput={setAdditionalInput} 
                                            />,
                                            infoWindowContentDiv
                                        );
                                    }
                                }
                            });
                        });

                        return marker;
                    });
                    setMarkers(newMarkers);
                    map.setCenter(locations[0].geometry.location);
                }
            });
        }
    };

    return (
        <div>
            <input
                type="text"
                ref={inputRef}
                placeholder="Search for a place..."
                onKeyDown={handleSearch}
                style={{
                    position: 'relative',
                    marginTop: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    padding: '10px',
                    width: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc'
                }}
            />
            <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />
        </div>
    );
};

export default Map;
