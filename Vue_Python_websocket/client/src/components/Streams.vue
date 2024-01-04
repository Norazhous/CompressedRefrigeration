<template>
  <div>
    <!-- <div><webcam-stream /></div>
    <div><data-stream /></div> -->
    <logging-stream />
</div>
</template> 

<script>

import dayjs from "dayjs";
import LoggingStream from './LoggingStream.vue'

export default {
  name: "Streams",
  components: {
    LoggingStream
    //WebcamStream,
    //DataStream,
  },
  data(){
    return{
      connectionChecker: null,
    }
  },
  computed: {
    // id() {
    //   return this.$route.params.id;
    // },
    getSessionExpired(){
      return this.$store.getters.getSessionExpired;
    },
    decodedStreams() {
      return this.$store.getters.getStreams;
    },
    streamsObtained() {
      return this.$store.getters.getStreamsObtained;
    },
    videoStream() {
      return this.$store.getters.getStream("video");
    },
    dataStream() {
      return this.$store.getters.getStream("data");
    },
  },
  created(){
      
    },
  mounted() {
    if (this.streamsObtained) {
      return;
    }
    try {
      let query = new URLSearchParams(window.location.search);
      //add the streams data to the store
      let streams = query.get('streams');
      let decodedStreams = JSON.parse(decodeURIComponent(String(streams)));

      this.$store.dispatch("setStreams", decodedStreams);
      //add expiry time data to store
      let expire_time = query.get('exp');
      this.$store.dispatch('setExpiryTime', expire_time);

      //Search for the course query parameter
      // If it doesn't exist then don't set null or '', just leave the default course set in the logging.js store - probably engdes1 for now
      let course = query.get('course');
      if(course != null){
        this.$store.dispatch('setCourse', course);
      }

    } catch (e) {
      console.log("error decoding streams");
      this.$store.dispatch("deleteStreams");
      
    }


    //reconnection code
    var _this = this;
    var cvb = function () {
      _this.$store.dispatch("setLastVideoWrite", dayjs().valueOf()); //milliseconds
    };

    document.addEventListener("jsmpeg:write", function () {
      cvb();
    });

    var wd = function(){
       var lc = _this.$store.getters.getLastVideoCheck;
      var lw = _this.$store.getters.getLastVideoWrite;

      var dropped = function () {
        
        _this.$store.dispatch("setConnectionIsDropped", true);
        _this.$store.dispatch("setConnectionDroppedAt", dayjs().unix()); //seconds
        var reconnectEvent = new Event("streams:dropped");
        document.dispatchEvent(reconnectEvent);
      };

      if (lc > lw) {
        // no write since last check
        if (_this.$store.getters.getConnectionIsDropped) {
          var when = _this.$store.getters.getConnectionDroppedAt;
          var since = dayjs().unix() - when;
          if (since > 10) {
            //oh oh, haven't managed to reconnect, let's try again
            // note on slow network or heavy load on relay-access, this might time out over and over again
            // but user experience on a network that slow/server that loaded is questionable anyway
            // given usually connect delay is  <<1sec; so we might consider that an edge case we are
            // not likely to hit, so long as provisioning is ok (Server side)
            // as for user network quality, never say never....
            dropped();
          }
          return;
        }
        dropped();
      } else {
        //connection OK
        _this.$store.dispatch("setLastVideoCheck", dayjs().valueOf()); //milliseconds
        _this.$store.dispatch("setConnectionIsDropped", false);
      }

    };

    this.connectionChecker = setInterval(wd, 1000);

  },
  methods:{
    
  },
  watch: {
    getSessionExpired(expired){
      if(expired){
        clearInterval(this.connectionChecker);
      }
    }
  },
};

</script>