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
let wallPillarRight = new Cube(3.75, 0, -9, .2, 1.6, .6, texture4);

let roofPillarSlant = new Cube(-2.2, 1.1, -9, .3, 1.9, .6,texture4, 0, 0, -1.1);
let roofPillarSlantRight = new Cube(2.8, 1.13, -9, .3, 1.9, .6,texture4, 0, 0, 1.1);

let mainRoofBind = new Cube(.3, 1.5, -9, 3.5, .45, .25, texture4);

let centerLeftWall = new Plain(-1.15, .35, -11.6, 5, 2, texture2, 0, 1.55, 0, .7);
let centerRightWall = new Plain(.8, .35, -11.6, 5, 2, texture2, 0, 1.55, 0, .7);

let doorEdgeTop = new Cube(1, 1.3, 5.5, 2, .2, .2, texture4);
let doorEdgeLeft = new Cube(1, .36, 5.5, .2, 2, .2, texture4);
let doorEdgeRight = new Cube(-.7, .36, 5.5, .2, 2, .2, texture4);
// first room

let floor1 = new Plain(0, 0, -9, 8, 40, texture1, 1.58  , 0, 0, .7);
let leftWall1 = new Plain(-3.5, 0, -9, 40, 2, texture2, 0, 1.55, 0, .7);
let leftRoof1 = new Plain(-2.6, 2, -9, 40, 2, texture3, .9, 1.55, 0, .7);
let upRoof1 = new Plain(.5, 2.3, -9, 5, 40, texture3B, 1.55, 0, 0, .7);
let rightRoof1 = new Plain(2.4, 1.1, -9, 40, 3, texture3B, -1, 1.6, 0, .7);

let rightWall1 = new Plain(3.4, 0, -9, 40, 3, texture2, 0, 1.55, 0, .7);

let centerLeftRoof = new Plain(-.4, 1.9, -11.6, 4.6, 1.1, texture3B, 1.1, 1.55, 0, .7);
let centerRightRoof = new Plain(1, 1.9, -11.6, 4.6, 1.5, texture3B, 1.1, -1.55, 0, .7);

let backWall = new Plain(0, .8, -14, 8, 3, texture2, 0, 0, 0, .7);
let frontWall = new Plain(-.4, .8, 10.2, 8, 3, texture2, 0, 0, 0, .7);
let roomWall1 = new Plain(-2, .8, 5, 2.6, 3, texture2, 0, 0, 0, .7);
let roomWall2 = new Plain(2.3, .8, 5, 2.6, 3, texture2, 0, 0, 0, .7);
let roomWall3Top = new Plain(.3, 1.94, 5, 2, 1, texture2, 0, 0, 0, .7);
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

    centerLeftWall,
    centerRightWall,

    centerLeftRoof,
    centerRightRoof,

    backWall,
    frontWall,
    roomWall1,
    roomWall2,
    roomWall3Top,

    doorEdgeLeft,
    doorEdgeRight,
    doorEdgeTop
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
