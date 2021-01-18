/*global kakao*/
import { Map } from 'react-kakao-maps'
import React, { useState, useEffect } from 'react';
import Sensor from './Sensor';

function KakaoMap(){
    const [sensorData, setSensorData] = useState([])

    useEffect(() => {
        fetchSensors();
    }, [])

    const fetchSensors = () => {
        setSensorData(require("../Dummies/sensors.json"));
        console.log("[FETCH] Sensor Data Fetched!")
    }

    return(
        <React.Fragment>
            <Map options={{
                center: new kakao.maps.LatLng(36.360649863349586, 127.34453802638934),
                mapTypeId: kakao.maps.MapTypeId.ROADMAP,
                maxLevel: 5,
                minLevel: 2
            }}>{sensorData.map(sensor => {
                    return <Sensor 
                        key={sensor.id}
                        sensorInfo={{
                            id: sensor.id,
                            lat: sensor.lat,
                            lng: sensor.lng,
                            name: sensor.name,
                            desc: sensor.desc,
                            addr: sensor.addr,
                            maxCount: sensor.maxCount
                        }}
                    ></Sensor>
                })}
            </Map>
        </React.Fragment>
    );
}

export default KakaoMap;