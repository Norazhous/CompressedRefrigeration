<template>
    <!-- <div>{{ array }}</div> -->
    <!-- <br>
    <button @click="connect()" >connect</button>
    <button @click="disconnect()">disconnect</button>
    <button @click="sendMeg();">sendMsg</button>
    <button @click="getArray()">getdata</button>
    <br>
    <br> -->

    <table class="table table-borderless -sm" style=" font-size:small;">
        <thead>
            <tr>
                <th scope="col">T1(°C)</th>
                <th scope="col">T2(°C)</th>
                <th scope="col">T3(°C)</th>
                <th scope="col">T4(°C)</th>
                <th scope="col">T5(°C)</th>
                <th scope="col">P1(bar)</th>
                <th scope="col">P2(bar)</th>
                <th scope="col">P3(bar)</th>
                <th scope="col">F(L/h)</th>
                <th scope="col">E(W)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ T1 }}</td>
                <td>{{ T2 }}</td>
                <td>{{ T3 }}</td>
                <td>{{ T4 }}</td>
                <td>{{ T5 }}</td>
                <td>{{ P1 }}</td>
                <td>{{ P2 }}</td>
                <td>{{ P3 }}</td>
                <td>{{ F }}</td>
                <td>{{ E }}</td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import { mapGetters } from 'vuex';
// import websocketstore from './modules/websocketsStore.js'

export default {
    name: "websockets",
    // websocketstore,
    data() {
        return {


        }
    },
    mounted() {
        this.connect();
    },
    watch() {
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
            
        ]),

        websockMsg() {
            // return websocketstore.getters.GETreceivedData;
            return this.$store.getters.GETreceivedData;
        },
        T1(){
            return this.GetCurrentTS1
        },
        T2(){
            return this.GetCurrentTS2
        },
        T3(){
            return this.GetCurrentTS3
        },
        T4(){
            return this.GetCurrentTS4
        },
        T5(){
            return this.GetCurrentTS5
        },
        P1(){
            return this.GetCurrentPS1
        },
        P2(){
            return this.GetCurrentPS2
        },
        P3(){
            return this.GetCurrentPS3
        },
        F(){
            return this.GetCurrentFlow
        },
        E(){
            return this.GetCurrentPower
        },
        // array(){
        //     return this.$store.state.websockets.PS1_Array
        // },
        
    },

    methods: {
        // connect() {
        //     if ("WebSocket" in window) {
        //         this.$store.dispatch('WEBSOCKET_INIT_ACTION');
        //         console.log(this.$store.state.websockets.TS1_value);
        //     } else {
        //         alert("The browser is not support WebSocket");
        //     }
        // },
        // disconnect(){
        //     if (this.$store.state.websocket.readyState=== WebSocket.OPEN){
        //         this.$store.dispatch('WEBSOCKET_CLOSE')
        //         console.log("closing...")
        //     }
        //     else{
        //         console.log("already closed")
        //     }
            
        // },
        // sendMeg() {
        //     let message = document.getElementById("name").value + ":" + document.getElementById("mes").value;
        //     document.getElementById("showMes").value += message + "\n\n";
        //     this.$store.dispatch("WEBSOCKET_REIVE_ACTION", message);
        //     setTimeout(() => {
        //         document.getElementById("showMes").value += this.websockMsg + "\n";
        //     }, 500)
        // },
        // getArray(){
        //     // this.$store.dispatch('GETARRAY')  
        //     console.log(this.$store.state.websockets.PS1_Array) 
        // }
      

    }


}
</script>