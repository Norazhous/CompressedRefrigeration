//vue3 update

<template>

    <div>
		<logging :url="getLogURL"/>
	</div>

</template>

<script>
import axios from "axios";
import Logging from "./Logging.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
	name: "LoggingStream",
	components:{
        Logging,
	},
    data(){
        return{
			stream: Object,
        }
    },
	mounted(){
		//make second and subsequent connections
		document.addEventListener("streams:dropped", this.getWebsocketConnection);
	},
    computed:{
		...mapGetters([
			'getLogURLObtained',
			'getLogURL',
        ]),
		streamOK(){
			return this.$store.getters.getStream("log");
		},
		
	},
	watch:{
		streamOK: function(is) {
			if (is) {
				this.getWebsocketConnection();
			} else {
				console.log("no log stream");
			}
		},
		getLogURLObtained(is) {
			if (is) {
				//console.log("get logURL", this.getLogURLObtained, this.getLogURL);
				this.setHardwareCode(this.getLogURL);
			}
		},

	},
	methods:{
		...mapActions([
			'setHardware'
		]),
		getWebsocketConnection(){
			this.stream = this.$store.getters.getStream("log");
			var accessURL = this.stream.url;
			var token = this.stream.token;
			let _this = this;
			this.$store.dispatch("deleteLogURL");
			axios
			.post(accessURL, {}, { headers: { Authorization: token } })
			.then((response) => {
				_this.$store.dispatch("setLogURL", response.data.uri);
			})
			.catch((err) => console.log(err));
		},
		setHardwareCode(url){
                let index = url.indexOf('pend');
                let hardware = url.substr(index, 6);
                this.setHardware(hardware);
            },
	
	},
	
	
}


</script>

<style scoped>

</style>