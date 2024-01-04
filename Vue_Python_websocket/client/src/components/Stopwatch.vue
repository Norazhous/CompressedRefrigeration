//Vue3 updated

<template>
    <div class='container-fluid m-2 background-white border rounded stopwatch-container' id='stopwatch-container'>
        <div class="row-sm m-2">
            <div class='form-group'><input type='text' class='form-control' id="stopwatch" :value="time_string" readonly></div>
        </div>
        <div class="col d-grid d-sm-block">
            <button class="button-sm button-primary" v-if="!isTiming" id="start" @click="startTimer">Start</button>
            <button class="button-sm button-warning" v-if="isTiming" id="pause" @click="pauseTimer">Stop</button>
            <button class="button-sm button-danger" id="reset" @click="resetTimer">Reset</button>
        </div>
    </div> 
</template>

<script>

export default {
    name: "Stopwatch",
    data(){
        return{
            isTiming: false,
            timerID: 0,
            start_time: 0,
            current_time: 0,        //timer in millseconds
            time_string: ""
        }
    },
    created(){
        this.isTiming = false;
        this.time_string = this.millsecondsFormatted(this.current_time);
    },
    methods:{
        startTimer(){ 
            this.isTiming = true;
            this.start_time = Date.now();
            this.timerID = setInterval(() => {
                this.updateTime()
            }, 10);

        },
        pauseTimer(){
            this.isTiming = false;
            clearInterval(this.timerID);
        },
        resetTimer(){
            this.current_time = 0;
            this.time_string = this.millsecondsFormatted(this.current_time);
        },
        updateTime(){
            this.current_time = Date.now() - this.start_time;
            this.time_string = this.millsecondsFormatted(this.current_time);
            
        },
        millsecondsFormatted(ms){
            let millseconds = ms % 1000;
            let seconds = Math.floor(ms / 1000);
            let minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;     //seconds left after minutes removed
            let hours = Math.floor(minutes / 60);
            minutes = minutes % 60;     //minutes left after hours removed

            if(hours >= 100){
                this.current_time = 0;
            }

            let hour_string = hours < 10 ? '0' + hours.toString() : hours.toString();
            let minute_string = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
            let second_string = seconds < 10 ? '0' + seconds.toString() : seconds.toString();
            let millsecond_string = millseconds.toString();

            return hour_string + ":" + minute_string + ":" + second_string + "." + millsecond_string;

        }
    },
    computed:{
        

    }
}


</script>

<style scoped>
.stopwatch-container{
    position: relative;
    max-width: 40%;
    min-width: 300px;
    min-height: 100px;
}

#stopwatch{
    font-size: 14;
    text-align: center;
    width: 100%;
}

</style>