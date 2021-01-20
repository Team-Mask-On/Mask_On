/*global kakao*/
import { CustomOverlay } from 'react-kakao-maps'
import { renderToString } from 'react-dom/server'
import React, { useState } from 'react';
import SensorCard from './SensorCard';
import SensorModal from './SensorModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sensor({ sensorInfo }){
    const currentTotal = sensorInfo.current.masked + sensorInfo.current.unmasked;
    const averageTotal = sensorInfo.current.average.average_masked + sensorInfo.current.average.average_unmasked;
    const currentMaskedRatio = sensorInfo.current.masked / currentTotal;
    const averageMaskedRatio = sensorInfo.current.average.average_masked / averageTotal;
    const totalDifference = currentTotal - averageTotal;
    const ratioDifference = ((currentMaskedRatio - averageMaskedRatio) * 100).toFixed(1);
    const capacity = sensorInfo.max_capacity - currentTotal;
    const [averageData, setAverageData] = useState([]);
    const [show, setShow] = useState(false);

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
                visible={true}
                options={{
                    position: new kakao.maps.LatLng(sensorInfo.latitude, sensorInfo.longitude),
                    zIndex: 9999
                }}
            >
                <div 
                    key={Math.random()}
                    onClick={() =>{
                        fetchAverage();
                        handleShow();
                    }} 
                    dangerouslySetInnerHTML={{__html: renderToString(
                        <SensorCard 
                            name={sensorInfo.name}
                            ratio={currentMaskedRatio}
                        ></SensorCard>
                    )}}
                />
            </CustomOverlay>
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