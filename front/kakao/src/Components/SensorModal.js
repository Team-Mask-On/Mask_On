import React, { useState } from 'react';
import Autosizer from "react-virtualized-auto-sizer";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import AverageChart from './AverageChart';
import CurrentChart from './CurrentChart';
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

function SensorModal(props){
    const show = props.show;
    const handleClose = props.onClose;
    const sensorInfo = props.sensorInfo;
    const currentMasked = props.currentMasked;
    const currentUnmasked = props.currentUnmasked;
    const totalDifference = props.totalDifference;
    const ratioDifference = props.ratioDifference;
    const capacity = props.capacity;
    const averageData = props.averageData;
    const [logView, setLogView] = useState(false);
    const [logData, setLogData] = useState([]);

    const fetchLog = async () => {
        axios.get('http://yabbyark.iptime.org:8001/api/logs/' + String(sensorInfo.sensor_id))
        .then(response => {
            setLogData(response.data);
            console.log("[FETCH] #" + String(sensorInfo.sensor_id) + " Log Data Fetched!");
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <Modal 
            show={show} 
            onHide={handleClose}
            //react-bootstrap의 문제로 true로 설정하면 findDomNode 경고가 발생.
            animation={true}
            aria-labelledby="contained-modal-title-vcenter"
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>{sensorInfo.name}</h1>
                    <h6>{sensorInfo.description}</h6>
                    <h6>{sensorInfo.address}</h6>
                </Modal.Title>
            </Modal.Header>
            {logView ? 
                <Modal.Body>
                    <div className="container">
                        <div className="wrapper" >
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>시간</th>
                                        <th>총원</th>
                                        <th>착용</th>
                                        <th>미착용</th>
                                    </tr>
                                </thead>
                                <tbody>{logData.map(log => {
                                    return <tr key={log.id}>
                                        <td>{log.created}</td>
                                        <td>{log.masked + log.unmasked}</td>
                                        <td>{log.masked}</td>
                                        <td>{log.unmasked}</td>
                                    </tr>
                                })}</tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={() => setLogView(false)}>요약 보기</Button>
                        <Tooltip title="새로고침">
                            <IconButton aria-label="delete" onClick={() => fetchLog()}>
                                <SyncRoundedIcon style={{ fontSize: 30 }}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Modal.Body> 
                :
                <Modal.Body>
                    <div>
                        <h2>실시간 데이터</h2>
                        <Container>
                            <Row>
                                <Col>
                                    <CurrentChart 
                                        masked={currentMasked}
                                        unmasked={currentUnmasked}
                                    ></CurrentChart>
                                </Col>
                                <Col>
                                    <h1>{capacity + "명"}</h1>
                                    <h5>{capacity > 0 ? capacity + "명 더 입장 가능합니다." : capacity === 0 ? "정원이 가득 찼습니다." : "정원을 초과하였습니다."}</h5>
                                    <h1>{totalDifference + "명"}</h1>
                                    <h5>{totalDifference < 0 ? "평균보다 사람이 " + (-1 * totalDifference) + "명 적습니다." : totalDifference > 0 ? "평균보다 " + totalDifference + "명 많은 사람이 있습니다." : "평균 만큼의 사람이 있습니다."}</h5>
                                    <h1>{ratioDifference + "%"}</h1>
                                    <h5>{ratioDifference < 0 ? "평균보다 마스크 착용률이 " + (-1 * ratioDifference) + "% 낮습니다." : ratioDifference > 0 ? "평균보다 마스크 착용률이 " + ratioDifference + "% 높습니다." : "평균 수준의 마스크 착용률입니다."}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div>
                        <h2>일평균 데이터</h2>
                        <div>
                            <Autosizer disableHeight>{({ width }) => (
                                <AverageChart 
                                    width={width} 
                                    averageData={averageData}
                                ></AverageChart>
                            )}</Autosizer>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={() => {
                            fetchLog();
                            setLogView(true);
                        }}>로그 보기</Button>
                        <Tooltip title="새로고침">
                            <IconButton aria-label="delete" onClick={() => props.fetchAverage()}>
                                <SyncRoundedIcon style={{ fontSize: 30 }}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Modal.Body>
            }
        </Modal>
    );
}

export default SensorModal;