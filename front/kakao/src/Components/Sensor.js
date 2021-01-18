/*global kakao*/
import { CustomOverlay } from 'react-kakao-maps'
import { renderToString } from 'react-dom/server'
import React, { useEffect, useState } from 'react';
import SensorCard from './SensorCard';
import SensorModal from './SensorModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sensor({ sensorInfo }){
    const id = sensorInfo.id;
    const lat = sensorInfo.lat;
    const lng = sensorInfo.lng;
    const name = sensorInfo.name;
    const [currentData, setCurrentData] = useState([]);
    const [totalDifference, setTotalDifference] = useState([]);
    const [ratioDifference, setRatioDifference] = useState([]);
    const [capacity, setCapacity] = useState([]);
    const [averageMaskedData, setAverageMaskedData] = useState([]);
    const [averageUnmaskedData, setAverageUnmaskedData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchCurrent = () => {
            //Sensor별 현황 데이터 fetch. id에 기반해서 현재 데이터를 가져오는 API를 호출해줘야함.
            setCurrentData(require("../Dummies/current/"+id+".json")[0]);
            console.log("[FETCH] #" + String(id) + " Current Data Fetched!")
        }
        fetchCurrent();
    }, [id, sensorInfo.maxCount]);

    useEffect(() => {
        const updateDifferences = () => {
            var currentTotal = currentData.currentMasked + currentData.currentUnmasked;
            var averageTotal = currentData.averageMasked + currentData.averageUnmasked;
            setTotalDifference(currentTotal - averageTotal);
            setRatioDifference((((currentData.currentMasked / currentTotal) * 100) - ((currentData.averageMasked / averageTotal) * 100)).toFixed(1))
            setCapacity(sensorInfo.maxCount - currentTotal);
            console.log("[UPDATE] #" + String(id) + " Updated differences!")
        }
        updateDifferences();
    }, [currentData, id, sensorInfo.maxCount]);

    const fetchAverage = () => {
        setAverageMaskedData(require("../Dummies/masked/"+id+".json"));
        setAverageUnmaskedData(require("../Dummies/unmasked/"+id+".json"));
        
        console.log("[FETCH] #" + String(id) + " Average Data Fetched!");
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    return(
        <>
            <CustomOverlay 
                options={{
                    position: new kakao.maps.LatLng(lat, lng),
                    zIndex: 9999
                }}
                visible={true}
                children={<div 
                    onClick={() =>{
                        fetchAverage();
                        handleShow();
                    }} 
                    dangerouslySetInnerHTML={
                        {__html: renderToString(<SensorCard name={name}></SensorCard>)}
                }></div>}
            ></CustomOverlay>
            <SensorModal 
                sensorInfo={sensorInfo}
                onClose={handleClose}
                show={show}
                currentMasked={currentData.currentMasked}
                currentUnmasked={currentData.currentUnmasked}
                totalDifference={totalDifference}
                ratioDifference={ratioDifference}
                capacity={capacity}
                averageMasked={averageMaskedData}
                averageUnmasked={averageUnmaskedData}
            />
        </>
    );
}

export default Sensor;