const canvas = document.getElementById("c");
const gl = canvas.getContext("webgl2", { alpha: false }); // do not include alphas

let texture0Ready = false;
let texture1Ready = false;

let light = { 
    color: vec3.fromValues(0.9, 0.8, 0.2),
    position: vec3.fromValues(0, 1, 0)
}

let isMoving = false;

let lightCube;

const camera = {
    position: vec3.fromValues(0, .3, 7), // position: [x, y, z]
    direction: vec3.fromValues(0, 0, -1),
    noYDirection: vec3.fromValues(0, 0, -1), // no pitch
    pitch: 0,
    yaw: -1 * Math.PI / 2.0
};


let gold = {
  ambient: [0.347, 0.299, 0.174],
  diffuse: [0.751, 0.606, 0.226],
  specular: [0.328, 0.328, 0.328],
  shininess: 22.0
};

let plastic = {
  ambient: [0.1, 0.1, 0.1],
  diffuse: [0.75, 0.75, 0.75],
  specular: [0.3, 0.3, 0.3],
  shininess: 10.0
};