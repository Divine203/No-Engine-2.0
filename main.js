// Prepare textures once
let texture1 = loadTexture("assets/cvlt-game-art-jaggedrockl1.jpg");
let texture2 = loadTexture("assets/wall1.png");
let texture3 = loadTexture("assets/wood.jpg");
let texture3B = loadTexture("assets/wood_2.jpg");

let texture4 = loadTexture("assets/metal_floor_prev2.jpg");

// Create scene
let scene = new Scene();

let pillar1 = new Cube(-.7, .4, -9, .25, 1.8, .3, texture4);
let pillar2 = new Cube(1.3, .4, -9, .25, 1.8, .3, texture4);

let pillar1Connect = new Cube(-.7, 1.3, -9, .5, .5, .25, texture4, 0, 0, .8);
let pillar2Connect = new Cube(1.3, 1.3, -9, .5, .5, .25, texture4, 0, 0, .8);

let wallPillar = new Cube(-2.9, 0, -9, .2, 1.6, .6, texture4);
let wallPillarRight = new Cube(3.35, 0, -9, .2, 1.6, .6, texture4);

let roofPillarSlant = new Cube(-2.2, 1.1, -9, .3, 1.9, .6,texture4, 0, 0, -1.1);
let roofPillarSlantRight = new Cube(2.8, 1.13, -9, .3, 1.9, .6,texture4, 0, 0, 1.1);

let mainRoofBind = new Cube(.3, 1.5, -9, 3.5, .45, .25, texture4);

let centerLeftWall = new Plain(-1.15, .35, -11.6, 5, 2, texture2, 0, 1.55, 0, .7);

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

    pillar1,
    pillar2,

    pillar1Connect,
    pillar2Connect,

    mainRoofBind,

    wallPillar,
    wallPillarRight,

    roofPillarSlant,
    roofPillarSlantRight,

    centerLeftWall
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
