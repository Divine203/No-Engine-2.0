const canvas = document.getElementById("c");
const gl = canvas.getContext("webgl2", { alpha: false }); // do not include alphas

let texture0Ready = false;
let texture1Ready = false;

let light = { 
    // ambient: vec3.fromValues(0.2, 0.2, 0.2),
    ambient: vec3.fromValues(1, 0, 0),
    position: vec3.fromValues(0, 1, 6)
}

let isMoving = false;

const camera = {
    position: vec3.fromValues(0, .3, 7), // position: [x, y, z]
    direction: vec3.fromValues(0, 0, -1),
    noYDirection: vec3.fromValues(0, 0, -1), // no pitch
    pitch: 0,
    yaw: -1 * Math.PI / 2.0
};
