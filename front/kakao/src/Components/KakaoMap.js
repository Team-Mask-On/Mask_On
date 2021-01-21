/*global kakao*/
import { Map } from 'react-kakao-maps'
import React, { useState, useEffect } from 'react';
import Sensor from './Sensor';

function KakaoMap(){
    const [sensorData, setSensorData] = useState([])
    const [latitude, setLatitude] = useState(36.360649863349586)
    const [longitude, setLongitude] = useState(127.34453802638934)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
        fetchSensors();
    }, [])

    const fetchSensors = () => {
        setSensorData(require("../Dummies/sensors.json"));
        console.log("[FETCH] Sensor Data Fetched!")
    }

    return(
        <React.Fragment>
            <Map options={{
                center: new kakao.maps.LatLng(latitude, longitude),
                mapTypeId: kakao.maps.MapTypeId.ROADMAP,
                maxLevel: 5,
                minLevel: 2
            }}>{sensorData.map(sensor => {
                    return <Sensor 
                        key={sensor.sensor_id}
                        sensorInfo={sensor}
                    ></Sensor>
                })}
            </Map>
        </React.Fragment>
    );
}

export default KakaoMap;