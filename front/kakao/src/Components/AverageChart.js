import React, {useState} from 'react';
import { XYPlot, Crosshair, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines, DiscreteColorLegend } from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    normal: {
        padding: theme.spacing(0.7),
        minWidth: 90
    },
    time: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: 700
    },
    content: {
        textAlign: "left",
        fontSize: 13,
        fontWeight: 700
    },
    legend: {
        position: 'absolute', 
        right: '10px', 
        top: '5px'
    },
    yaxis: {
        text: {
            stroke: 'none', 
            fill: '#6b6b76', 
            fontWeight: 300
        }
    },
    xaxis: {
        line: {stroke: '#6b6b76'},
        ticks: {stroke: '#6b6b76'},
        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 300}
    }
}))

function AverageChart(props){
    const classes = useStyles()
    const averageData = props.averageData;
    const maskedColor = "#7abd91"
    const unmaskedColor = "#ff6962"
    const charWidth = props.width;
    const chartHeight = 250;
    const barWidth = 0.3;
    const gridColor = '#DFE2E6'
    const [crosshairValues, setCrosshairValues] = useState([]);
    const [targetTime, setTime] = useState("");
    const [targetMasked, setMasked] = useState(0);
    const [targetUnmasked, setUnmasked] = useState(0);
    const [targetRatio, setRatio] = useState("");
    const tick = ["0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100"]
    const legend = [
        {
            title: ' 마스크 착용',
            color: maskedColor,
        },
        {
            title: ' 마스크 미착용',
            color: unmaskedColor,
        }
    ]         
    const _onMouseLeave = () => {
        setCrosshairValues([]);
    };

    const _onNearestX = (value, {index}) => {
        setCrosshairValues(averageData.map(d => d[index]));
        setTime(Object.values(averageData[0][index])[1]);
        setMasked(Object.values(averageData[0][index])[0]);
        setUnmasked(Object.values(averageData[1][index])[0]);
        setRatio(targetMasked / (targetMasked + targetUnmasked));
    };

    const getCardColor = (maskedRatio) => {
        if(maskedRatio >= 0.5)
            return "hsl(" + String(maskedRatio * 240 - 120) + ",80%,50%)";
        else
            return "hsl(0, 80%, 50%)";
    }

    const getFontColor = (maskedRatio) => {
        if(maskedRatio >= 0.7)
            return "#2E2E2E";
        else
            return "#FFFFFF";
    }

    return (
        <XYPlot
            onMouseLeave={_onMouseLeave}
            stackBy="y"
            xType="ordinal" 
            height={chartHeight} 
            width={charWidth}
        >
            <XAxis 
                className={classes.xaxis}
                tickValues={tick}
            />
            <YAxis className={classes.yaxis}/>
            <HorizontalGridLines style={{stroke: gridColor}} />
            <VerticalBarSeries
                onNearestX={_onNearestX}
                barWidth={barWidth}
                data={averageData[0]}
                color={maskedColor}
            />
            <VerticalBarSeries
                barWidth={barWidth}
                data={averageData[1]}
                color={unmaskedColor}
            />
            <DiscreteColorLegend
                className={classes.legend}
                orientation="horizontal"
                items={legend}
            />
            <Crosshair values={crosshairValues} className={'test-class-name'}>
                <div>
                    <Card 
                        className={classes.normal}
                        style={{ backgroundColor: getCardColor(targetRatio), color: getFontColor(targetRatio)
                    }}>
                        <Typography className={classes.time} component="p">{targetTime}시</Typography>
                        <Typography className={classes.content} component="p">착용 : {targetMasked} 명</Typography>
                        <Typography className={classes.content} component="p">미착용 : {targetUnmasked} 명</Typography>
                    </Card>
                </div>
            </Crosshair>
        </XYPlot>
    );
}
export default AverageChart;