/*global kakao*/
import { Map } from 'react-kakao-maps'
import React, { useState, useEffect } from 'react';
import Sensor from './Sensor';

function KakaoMap(){
    const [sensorData, setSensorData] = useState([])
    const [latitude, setLatitude] = useState(36.360649863349586)
    const [longitude, setLongitude] = useState(127.34453802638934)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        moveToCurrentLocation()
        fetchSensors();
    }, [])

    const fetchSensors = () => {
        setSensorData(require("../Dummies/sensors.json"));
        console.log("[FETCH] Sensor Data Fetched!")
    }

    const moveToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            position => {
                console.log("getLocation", position.coords.latitude, position.coords.longitude)
                moveTo(position.coords.latitude, position.coords.longitude)
                setLoading(false)
            },
            () => {
                setLoading(false)
            }
            )
        } else {
            setLoading(false)
        }
    }

    const moveTo = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
    }

    return(
        <React.Fragment>
            {loading ? 
                <h1>로딩화면이 들어갈 곳</h1>
                :
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
            }
        </React.Fragment>
    );
}

export default KakaoMap;