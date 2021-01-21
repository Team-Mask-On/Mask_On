/*global kakao*/
import { Map } from 'react-kakao-maps'
import React, { useState, useEffect } from 'react';
import Sensor from './Sensor';
import SearchBar from './SearchBar';
import { store } from 'react-notifications-component';

function KakaoMap(){
    const [sensorData, setSensorData] = useState([])
    const [latitude, setLatitude] = useState(37.40213319610438)
    const [longitude, setLongitude] = useState(127.10863508204353)

    useEffect(() => {
        moveToCurrentLocation()
        fetchSensors();
    }, [])

    const fetchSensors = () => {
        setSensorData(require("../Dummies/sensors.json"));
        console.log("[FETCH] Sensor Data Fetched!")
    }

    const message = (title, message, type) => {
        store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated animate__fadeIn"],
            animationOut: ["animate__animated animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true
            }
        });
    }

    const moveToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log("getLocation", position.coords.latitude, position.coords.longitude)
                    moveTo(position.coords.latitude, position.coords.longitude)
                    message("성공!", "현위치 기반으로 좌표가 재설정 설정되었습니다.", "success")
                }
            )
        }
        else{
            message("실패!", "기본값으로 좌표가 설정되었습니다.", "danger")
        }
    }
    
    const moveTo = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
    }

    return(
        <React.Fragment>
            <SearchBar />
            <Map options={{
                center: new kakao.maps.LatLng(latitude, longitude),
                mapTypeId: kakao.maps.MapTypeId.ROADMAP,
                maxLevel: 8,
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