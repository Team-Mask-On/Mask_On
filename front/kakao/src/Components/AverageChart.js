import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines, DiscreteColorLegend } from 'react-vis';

function AverageChart(props){
    const maskedData = props.masked;
    const unmaskedData = props.unmasked;
    const maskedColor = "#7abd91"
    const unmaskedColor = "#ff6962"
    const charWidth = props.width;
    const chartHeight = 250;
    const gridColor = '#DFE2E6'
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

    return (
        <XYPlot
            stackBy="y"
            xType="ordinal" 
            height={chartHeight} 
            width={charWidth}
        >
            <XAxis />
            <YAxis />
            <HorizontalGridLines style={{stroke: gridColor}} />
            <VerticalBarSeries
                data={maskedData}
                color={maskedColor}
            />
            <VerticalBarSeries
                data={unmaskedData}
                color={unmaskedColor}
            />
            <DiscreteColorLegend
                style={{position: 'absolute', right: '10px', top: '5px'}}
                orientation="horizontal"
                items={legend}
            />
        </XYPlot>
    );
}
export default AverageChart;