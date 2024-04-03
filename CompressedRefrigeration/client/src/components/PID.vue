<template>
    <div>
        <!-- test svg dispaly  -->
        <PID_SVG/>
    </div>
    <!-- <div>
        <InteractiveChart/>
    </div> -->

    
</template>

<script>
//svgfiller has error for this project, and maybe because of the version problem. https://github.com/biigpongsatorn/vue-svg-filler/issues/36
// import Svgfiller from "vue-svg-filler"

import PID_SVG from "./PID_SVG.vue"
// import InteractiveChart from "./interactiveChart.vue"


export default {
    name: "PID",
    components: {
        // Svgfiller,
        PID_SVG,
        // InteractiveChart,
        
},
    data() {
        return {
            
    }
},
    methods: {
    
},
}


</script>
