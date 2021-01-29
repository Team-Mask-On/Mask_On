import React from 'react';
import { RadialChart } from 'react-vis';

function CurrentChart(props){
    const width = 250;
    const height = 250;
    const maskCount = props.masked;
    const unmaskCount = props.unmasked;
    const maskedColor = "#7abd91"
    const unmaskedColor = "#ff6962"
    const data = [
        {
            angle: maskCount,
            label: '착용 ' + maskCount,
            color: maskedColor,
        },
        {
            angle: unmaskCount,
            label: '미착용 ' + unmaskCount,
            color: unmaskedColor,
        }
    ]

    return (
        <div>
            <RadialChart
                animation={true}
                width={width}
                height={height}
                colorType="literal"
                data={data}
                labelsRadiusMultiplier={0.8}
                labelsStyle={{
                    textAnchor: 'middle',
                    fontSize: 16,
                    fontWeight: "bold",
                    fill: "#F6F7FC"
                }}
                showLabels
            />
        </div>
    );
}
export default CurrentChart;