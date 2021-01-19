/*global kakao*/
import { CustomOverlay } from 'react-kakao-maps'
import { renderToString } from 'react-dom/server'
import React, { useEffect, useState } from 'react';
import SensorCard from './SensorCard';
import SensorModal from './SensorModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sensor({ sensorInfo }){
    const [totalDifference, setTotalDifference] = useState([]);
    const [ratioDifference, setRatioDifference] = useState([]);
    const [capacity, setCapacity] = useState([]);
    const [averageData, setAverageData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const updateDifferences = () => {
            var currentTotal = sensorInfo.current.masked + sensorInfo.current.unmasked;
            var averageTotal = sensorInfo.current.average_masked + sensorInfo.current.average_unmasked;
            setTotalDifference(currentTotal - averageTotal);
            setRatioDifference((((sensorInfo.current.masked / currentTotal) * 100) - ((sensorInfo.current.average_masked / averageTotal) * 100)).toFixed(1))
            setCapacity(sensorInfo.max_capacity - currentTotal);
            console.log("[UPDATE] #" + String(sensorInfo.sensor_id) + " Updated differences!")
        }
        updateDifferences();
    }, [sensorInfo, sensorInfo.sensor_id, sensorInfo.max_capacity]);

    const fetchAverage = async () => {
        const response = await require("../Dummies/average/"+String(sensorInfo.sensor_id)+".json");
        setAverageData(response);
        console.log("[FETCH] #" + String(sensorInfo.sensor_id) + " Average Data Fetched!");
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
                    position: new kakao.maps.LatLng(sensorInfo.latitude, sensorInfo.longitude),
                    zIndex: 9999
                }}
                visible={true}
                children={<div 
                    onClick={() =>{
                        fetchAverage();
                        handleShow();
                    }} 
                    dangerouslySetInnerHTML={
                        {__html: renderToString(<SensorCard name={sensorInfo.name}></SensorCard>)}
                }></div>}
            ></CustomOverlay>
            <SensorModal 
                sensorInfo={sensorInfo}
                onClose={handleClose}
                show={show}
                currentMasked={sensorInfo.current.masked}
                currentUnmasked={sensorInfo.current.unmasked}
                totalDifference={totalDifference}
                ratioDifference={ratioDifference}
                capacity={capacity}
                averageData={averageData}
            />
        </>
    );
}

export default Sensor;