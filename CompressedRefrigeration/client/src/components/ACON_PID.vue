<template>
    <div>
        <!-- test svg dispaly  -->
        <PID_SVG/>

    </div>
</template>

<script>
//svgfiller has error for this project, and maybe because of the version problem. https://github.com/biigpongsatorn/vue-svg-filler/issues/36
// import Svgfiller from "vue-svg-filler"

import PID_SVG from "./ACON_PID_SVG.vue"

export default {
    name: "PID",
    components: {
        // Svgfiller,
        PID_SVG,
},
    data() {
        return {
            
    }
},
    methods: {
    
},
}


</script>
