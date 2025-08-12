// Prepare textures once
let texture1 = loadTexture("assets/cvlt-game-art-jaggedrockl1.jpg");
let texture2 = loadTexture("assets/wall1.png");
let texture3 = loadTexture("assets/wood.jpg");
let texture3B = loadTexture("assets/wood_2.jpg");

// Create scene
let scene = new Scene();

let cube1 = new Cube(0, 0, -7, 1, 3, 1, texture1);
let cube2 = new Cube(2, 0.5, -10, 1, 1, 0.5, texture1);

// first room

let floor1 = new Plain(0, 0, -9, 8, 10, texture1, 1.55, 0, 0, .7);
let leftWall1 = new Plain(-3.5, 0, -9, 10, 2, texture2, 0, 1.55, 0, .7);
let leftRoof1 = new Plain(-2.3, 1.85, -9, 10, 2, texture3, 1.1, 1.55, 0, .7);
let upRoof1 = new Plain(.5, 2.3, -9, 4, 10, texture3B, 1.55, 0, 0, .7);
let rightRoof1 = new Plain(2.4, 1.1, -9, 10, 3, texture3B, -1, 1.6, 0, .7);

let rightWall1 = new Plain(3, 0, -9, 10, 2, texture2, 0, 1.55, 0, .7);
//

scene.objects = [
    floor1, 
    leftWall1,
    leftRoof1,
    upRoof1,
    rightRoof1,

    rightWall1,


    cube1,
    cube2
];

// Set up camera
const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();
mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 1000);

function animate() {
    moveCamera(); // updates camera.position and camera.direction

    // cube1.rotation[1] += 0.01; // spin Y axis
    // cube1.rotation[0] += 0.005; // tilt X axis

    let target = vec3.create();
    vec3.add(target, camera.position, camera.direction);
    mat4.lookAt(viewMatrix, camera.position, target, vec3.fromValues(0, 1, 0));

    scene.render(viewMatrix, projectionMatrix);
    requestAnimationFrame(animate);
}
animate();
