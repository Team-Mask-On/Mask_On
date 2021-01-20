import React, {useState, useEffect} from 'react';
import { XYPlot, Crosshair, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines, DiscreteColorLegend } from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    normal: {
        padding: theme.spacing(0.7),
        color: "#fff",
        textAlign: "center",
        minWidth: 100
    },
    title: {
        fontSize: 13,
        fontWeight: 700
    },
    content: {
        textAlign: "left",
        fontSize: 13,
        fontWeight: 500
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
    const averageData = [props.averageData.masked, props.averageData.unmasked];
    const maskedColor = "#7abd91"
    const unmaskedColor = "#ff6962"
    const charWidth = props.width;
    const chartHeight = 250;
    const gridColor = '#DFE2E6'
    const [crosshairValues, setCrosshairValues] = useState([]);
    const [targetTime, setTime] = useState("");
    const [targetMasked, setMasked] = useState(0);
    const [targetUnmasked, setUnmasked] = useState(0);
    const [targetRatio, setRatio] = useState(0);

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

    useEffect(() => {
        if(crosshairValues.length === 0){
            console.log("empty!!")
        }
        else{
            setTime(Object.values(crosshairValues[0])[1]); 
            setMasked(Object.values(crosshairValues[0])[0]);
            setUnmasked(Object.values(crosshairValues[1])[0]);
            setRatio(targetMasked / (targetMasked + targetUnmasked));
        }
    }, [crosshairValues, targetMasked, targetUnmasked]);

    const _onMouseLeave = () => {
        setCrosshairValues([]);
    };

    const _onNearestX = (value, {index}) => {
        setCrosshairValues(averageData.map(d => d[index]));
    };

    const getColor = (value) => {
        return ["hsl(", (value * 100 + 10).toString(10), ",80%,50%)"].join("");
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
                tickValues={["0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100"]}
            />
            <YAxis className={classes.yaxis}/>
            <HorizontalGridLines style={{stroke: gridColor}} />
            <VerticalBarSeries
                onNearestX={_onNearestX}
                barWidth={0.3}
                data={averageData[0]}
                color={maskedColor}
            />
            <VerticalBarSeries
                barWidth={0.3}
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
                        style={{ backgroundColor: getColor(targetRatio), color: '#FFFFFF'
                    }}>
                        <Typography className={classes.title} component="p">{targetTime}시</Typography>
                        <Typography className={classes.content} component="p">착용 : {targetMasked} 명</Typography>
                        <Typography className={classes.content} component="p">미착용 : {targetUnmasked} 명</Typography>
                    </Card>
                </div>
            </Crosshair>
        </XYPlot>
    );
}
export default AverageChart;