<template>
    <div id="chart">
        <canvas id="smoothie-chart" style="width:100%;height:400px" ></canvas>
        <div id="legend" >
            <svg height="30" width="80">
                <text x="0" y="18" fill="rgb(0, 0, 0)">Legend:</text>
            </svg>
            <svg height="60" width="550">
                <line x1="0" y1="5" x2="50" y2="5" style="stroke:rgb(0, 255, 0);stroke-width:3" /> 
                <text x="0" y="25" fill="rgb(0, 255, 0)" font-style="italic">T1(°C)</text>
                <line x1="70" y1="5" x2="120" y2="5" style="stroke:rgb(255, 0, 255);stroke-width:3" /> 
                <text x="70" y="25" fill="rgb(255, 0, 255)" font-style="italic">T2(°C)</text>
                <line x1="140" y1="5" x2="190" y2="5" style="stroke:rgb(255, 0, 0);stroke-width:3" /> 
                <text x="140" y="25" fill="rgb(255, 0, 0)" font-style="italic">T3(°C)</text>
                <line x1="210" y1="5" x2="260" y2="5" style="stroke:rgb(0, 0, 255);stroke-width:3" /> 
                <text x="210" y="25" fill="rgb(0, 0, 255)" font-style="italic">T4(°C)</text>
                <line x1="280" y1="5" x2="330" y2="5" style="stroke:rgb(210, 210, 0);stroke-width:3" /> 
                <text x="280" y="25" fill="rgb(210, 210, 0)" font-style="italic">T5(°C)</text>
                <line x1="350" y1="5" x2="400" y2="5" style="stroke:rgb(0, 255, 255);stroke-width:3" /> 
                <text x="350" y="25" fill="rgb(0, 255, 255)" font-style="italic">P1(bar)</text>
                <line x1="420" y1="5" x2="470" y2="5" style="stroke:rgb(141, 14, 14);stroke-width:3" /> 
                <text x="420" y="25" fill="rgb(141, 14, 14)" font-style="italic">P2(bar)</text>
                <line x1="490" y1="5" x2="540" y2="5" style="stroke:rgb(14, 14, 141);stroke-width:3" /> 
                <text x="490" y="25" fill="rgb(14, 14, 141)" font-style="italic">P3(bar)</text>
                <line x1="0" y1="35" x2="50" y2="35" style="stroke:rgb(0, 178, 148);stroke-width:3" /> 
                <text x="0" y="55" fill="rgb(0, 178, 148)" font-style="italic">F(L/h)</text>
                <!-- <line x1="70" y1="35" x2="120" y2="35" style="stroke:rgb(255, 140, 0);stroke-width:3" /> 
                <text x="70" y="55" fill="rgb(255, 140, 0)" font-style="italic">E(W)</text> -->
            </svg>
        </div>
    </div>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'

import { SmoothieChart } from 'smoothie';
import { TimeSeries } from 'smoothie';

export default {
    name: "RealtimeChart",
    components: {

    },

    computed: {
        ...mapGetters([
            'GetCurrentTS1',
            'GetCurrentTS2',
            'GetCurrentTS3',
            'GetCurrentTS4',
            'GetCurrentTS5',
            'GetCurrentPS1',
            'GetCurrentPS2',
            'GetCurrentPS3',
            'GetCurrentFlow',
            'GetCurrentPower',
            "GETCurrentTime",
        ]),

    },
    mounted() {
        setTimeout(() => {
            this.plotChart();
        }, 1000);

    },
    methods: {
        timePlot() {
            return this.GETCurrentTime;
        },

        // TS1Plot() {
        //     return this.GetCurrentTS1;
        // },

        // test(){
        //     console.log(this.GetCurrentTS1);
        // },

        plotChart() {
            var smoothie = new SmoothieChart({responsive: true, millisPerPixel: 70, grid: { fillStyle: '#ffffff', strokeStyle: '#c9c9c9', millisPerLine: 2000, verticalSections: 3, lineWidth: 1},labels:{fillStyle:'#000000'}, tooltip: true, tooltipLine: { strokeStyle: '#bbbbbb' }, timestampFormatter:SmoothieChart.timeFormatter });
            smoothie.streamTo(document.getElementById("smoothie-chart"));

            // Data
            var line1 = new TimeSeries();
            var line2 = new TimeSeries();
            var line3 = new TimeSeries();
            var line4 = new TimeSeries();
            var line5 = new TimeSeries();
            var line6 = new TimeSeries();
            var line7 = new TimeSeries();
            var line8 = new TimeSeries();
            var line9 = new TimeSeries();
            // var line10 = new TimeSeries();

            // console.log(this.GETCurrentTime)
            // console.log(this.GetCurrentTS1);
            // line1.append(this.GETCurrentTime, 0.3);

            // Add a random value to each line every second
            setInterval(() => {
                line1.append(Date.now(), this.GetCurrentTS1);
                // console.log("servertime"+this.GETCurrentTime);
                // console.log("UItime"+ Date.now());
                // console.log(this.GETCurrentTime-Date.now())
                // console.log(this.GetCurrentTS1);
                //this.test();
                line2.append(Date.now(), this.GetCurrentTS2);
                line3.append(Date.now(), this.GetCurrentTS3);
                line4.append(Date.now(), this.GetCurrentTS4);
                line5.append(Date.now(), this.GetCurrentTS5);
                line6.append(Date.now(), this.GetCurrentPS1);
                line7.append(Date.now(), this.GetCurrentPS2);
                line8.append(Date.now(), this.GetCurrentPS3);
                line9.append(Date.now(), this.GetCurrentFlow);
                // line10.append(Date.now(), this.GetCurrentPower);
            }, 1000);

            // Add to SmoothieChart
            smoothie.addTimeSeries(line1, { strokeStyle: 'rgb(0, 255, 0)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line2, { strokeStyle: 'rgb(255, 0, 255)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line3, { strokeStyle: 'rgb(255, 0, 0)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line4, { strokeStyle: 'rgb(0, 0, 255)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line5, { strokeStyle: 'rgb(210, 210, 0)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line6, { strokeStyle: 'rgb(0, 255, 255)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line7, { strokeStyle: 'rgb(141, 14, 14)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line8, { strokeStyle: 'rgb(14, 14, 141)', lineWidth: 1.2, interpolation:'linear' });
            smoothie.addTimeSeries(line9, { strokeStyle: 'rgb(0, 178, 148)', lineWidth: 1.2, interpolation:'linear' });
            // smoothie.addTimeSeries(line10, { strokeStyle: 'rgb(255, 140, 0)', lineWidth: 1.2, interpolation:'linear' });

            // add some delay
            // smoothie.streamTo(document.getElementById("smoothie-chart"), 1000 /*delay*/);
        }
    },

    watch: {


    }
}


</script>

<style>
div.smoothie-chart-tooltip {
    background: #444;
    padding: 1em;
    margin-top: 20px;
    font-family: consolas;
    color: white;
    font-size: 15px;
    pointer-events: none;
}

#legend {
    background: #ffffff;
    border-color: black;
    height:60px;
    width:640px;
    margin:auto;

}
</style>