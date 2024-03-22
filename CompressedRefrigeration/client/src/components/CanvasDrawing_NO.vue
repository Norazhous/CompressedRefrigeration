<template>
    <div class="image-container">
        <span>ssss</span>
        <img src="/images/R134_p_h_diagram.png" alt="Background" @load="adjustCanvasSize">
        <!-- <img src="/images/R134_p_h_diagram.svg" alt="Background"> -->
        <canvas ref="canvas" @mousedown="startDrawing" @mouseup="endDrawing" @mousemove="drawLine"
            @mouseout="endDrawing"></canvas>
    </div>

</template>

<script>
export default {
    name: "CanvasDrawing",
    props: {
        imageSrc: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            drawing: false,
            startX: 0,
            startY: 0,
        };
    },
    methods: {
        adjustCanvasSize(e) {
            const { width, height } = e.target.getBoundingClientRect();
            const canvas = this.$refs.canvas;
            canvas.width = width;
            canvas.height = height;
        },
        startDrawing(e) {
            this.drawing = true;
            const rect = this.$refs.canvas.getBoundingClientRect();
            this.startX = e.clientX - rect.left;
            this.startY = e.clientY - rect.top;
            this.drawLine(e);
        },
        endDrawing() {
            this.drawing = false;
            this.$refs.canvas.getContext('2d').beginPath();
        },
        drawLine(e) {
            if (!this.drawing) return;
            const ctx = this.$refs.canvas.getContext('2d');
            const rect = this.$refs.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff0000';
            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y);
        },
    },
};
</script>

<style>
.image-container {
    position: relative;
    display: inline-block;
}

.image-container img,
.image-container canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 300;
    height: 300;
}
</style>