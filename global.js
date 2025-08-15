const canvas = document.getElementById("c");
const gl = canvas.getContext("webgl2");

let texture0Ready = false;
let texture1Ready = false;

let isMoving = false;

const camera = {
    position: vec3.fromValues(0, 0, -5), // position: [x, y, z]
    direction: vec3.fromValues(0, 0, -1),
    noYDirection: vec3.fromValues(0, 0, -1), // no pitch
    pitch: 0,
    yaw: -1 * Math.PI / 2.0
};


// character model

// https://opengameart.org/content/low-poly-voodoo-native-with-blender