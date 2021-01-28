/*global kakao*/
import { Map } from 'react-kakao-maps'
import React, { useState, useEffect, useCallback } from 'react';
import Sensor from './Sensor';
import { store } from 'react-notifications-component';
import SearchBar from "./SearchBar";
import axios from 'axios';

function KakaoMap({ apiURL, refreshTerm }){
    const [sensorData, setSensorData] = useState([])
    const [latitude, setLatitude] = useState(37.40213319610438)
    const [longitude, setLongitude] = useState(127.10863508204353)

    const moveToCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    moveTo(position.coords.latitude, position.coords.longitude)
                    message("현위치 좌표 설정 성공!", "현위치 기반으로 좌표가 설정되었습니다.", "success")
                }
            )
        }
        else{
            message("현위치 좌표 설정 실패!", "기본값으로 좌표가 설정되었습니다.", "danger")
        }
    }, [])

    useEffect(() => {
        moveToCurrentLocation();
    }, [moveToCurrentLocation])

    useEffect(() => {
        const fetchSensors = () => {
            axios.get(apiURL + '/sensors/')
            .then(response => {
                setSensorData(response.data);
                message("정보 갱신", "센서 정보가 갱신되었습니다.", "success")
                console.log("[FETCH] Sensor Data Fetched!")
            })
            .catch(error => {
                message("정보 갱신 에러", String(error), "danger")
            });
        }
        fetchSensors();
        const interval = setInterval(() => fetchSensors(), refreshTerm)
        return () => {
            clearInterval(interval);
        }
    }, [apiURL, refreshTerm])


    const message = (title, message, type) => {
        store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",  
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 5000 },
            dismissable: { click: true }
        });
    }

    const moveTo = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
    }

    const keywordSearch = (keyword) => {
        const places = new kakao.maps.services.Places()
        places.keywordSearch(keyword, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const { x, y } = result[0]
            moveTo(y, x)
            message("검색 결과", "키워드로 검색된 위치로 좌표가 설정되었습니다.", "success")
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            message("검색 결과", "키워드로 검색된 결과가 없습니다.", "danger")
          } else {
            message("서비스 오류", "서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", "danger")
          }
        })
    }

    return(
        <React.Fragment>
            <Map
            options={{
                center: new kakao.maps.LatLng(latitude, longitude),
                mapTypeId: kakao.maps.MapTypeId.ROADMAP,
                maxLevel: 6,
                minLevel: 2
            }}>{sensorData.map(sensor => {
                    return <Sensor 
                        key={sensor.sensor_id}
                        sensorInfo={sensor}
                        apiURL={apiURL}
                        moveTo={moveTo}
                    ></Sensor>
                })}
            </Map>
            <SearchBar onSearch={keywordSearch}></SearchBar>
        </React.Fragment>
    );
}

export default KakaoMap;