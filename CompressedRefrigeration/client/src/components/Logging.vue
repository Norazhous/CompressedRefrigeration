<template>

<div id='logging'>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Logging',
    props: {
        url: String,   
    },
    data () {
        return {
            logSocket: null,
        }
    },
    mounted(){
        //this.connect(); //TESTING
        
    },
    watch:{
        url(){
			try{
				if(this.url != '' && this.getLogURLObtained){
					this.connect();								
				} else{
					console.log('disconnecting logging websocket');
				}
			} catch(e){
				console.log(e);
			}
		},
    },
    computed:{
        ...mapGetters([
            'getLogURLObtained'
            
        ]),

    },
    methods:{
        ...mapActions([
            'logClick',
            'logStart',
            'logEnd',
        ]),
        initialLogging(){
            this.logStart({log:'start', data: Date.now()});

            window.onclick = (event) => {
                let data = {target: event.target.id, screen_pos: {x: event.clientX, y: event.clientY}, window: {width: window.innerWidth, height: window.innerHeight}}
                this.logClick({log:'click', data:data});
            }

            window.addEventListener('pagehide', () => {this.logEnd({log:'end', type:'close', data: Date.now()})});				//closing window
            window.addEventListener('beforeunload', () => {this.logEnd({log:'end', type:'refresh', data: Date.now()})});			//refreshing page, changing URL
        },
        connect(){
            let _store = this.$store;

			this.logSocket = new WebSocket(this.url);
            //this.logSocket = new WebSocket('ws://127.0.0.1:8000');  //TESTING
			_store.dispatch('setLogSocket', this.logSocket);
            
            this.logSocket.onopen = () => {
				this.initialLogging();
			};
        }
    }
}
</script>

<style>

</style>