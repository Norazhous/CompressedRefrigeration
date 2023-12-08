<template>
    <textarea rows="3" cols="30" id="showMes" style="width:300px;height:500px;"></textarea>
    <div>{{ websockMsg }}</div>
    <br />
    <label>名称</label>
    <input type="text" id="name" value="admin" />
    <br />
    <label>消息</label>
    <input type="text" id="mes" value="123456"/>
    <br />
    <br>
    <button @click="connect()" >connect</button>
    <button @click="disconnect()">disconnect</button>
    <button @click="sendMeg();">sendMsg</button>
    <button @click="getData()">getdata</button>
    <br>
    <br>

    <table class="table">
        <thead>
            <tr>
                <th>time</th>
                <th>ca</th>
                <th>cb</th>
                <th>va</th>
                <th>ca</th>
                <th>k1</th>
                <th>k2</th>
                <th>k3</th>
                <th>ph</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>{{ currenttime }}</td>
            <td>{{ ca }}</td>
            <td>{{ cb }}</td>
            <td>{{ va }}</td>
            <td>{{ vb }}</td>
            <td>{{ k1 }}</td>
            <td>{{ k2 }}</td>
            <td>{{ k3 }}</td>
            <td>{{ ph }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "websocket",
    data() {
        return {
            
            // ca: 0.01,
            cb: 0.01,
            va: 0.01,
            vb: 0.01,
            k1: 0,
            k2: 0,
            k3: 0,
            ph: 0,


        }
    },
    mounted() {
        this.connect();
    },
    watch() {
        this.currenttime();
    },
    computed: {
        websockMsg() {
            return this.$store.getters.GETreceivedData;
        },
        ca(){
            return this.$store.getters.GETCA;
        },
        currenttime(){
            return this.$store.getters.GETTIME;
        },


        

    },

    methods: {
        connect() {
            if ("WebSocket" in window) {
                this.$store.dispatch('WEBSOCKET_INIT_ACTION')
            } else {
                alert("The browser is not support WebSocket");
            }
        },
        disconnect(){
            if (this.$store.state.websocket.readyState=== WebSocket.OPEN){
                this.$store.dispatch('WEBSOCKET_CLOSE')
                console.log("closing...")
            }
            else{
                console.log("already closed")
            }
            
        },
        sendMeg() {
            let message = document.getElementById("name").value + ":" + document.getElementById("mes").value;
            document.getElementById("showMes").value += message + "\n\n";
            this.$store.dispatch("WEBSOCKET_REIVE_ACTION", message);
            setTimeout(() => {
                document.getElementById("showMes").value += this.websockMsg + "\n";
            }, 500)
        },
        getData(){
            this.$store.dispatch('GETDATA')   
        }
      

    }


}
</script>