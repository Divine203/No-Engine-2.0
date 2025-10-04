// Prepare textures once
let texture1 = loadTexture("assets/cvlt-game-art-jaggedrockl1.jpg");
let texture2 = loadTexture("assets/wall1.png");
let wall3 = loadTexture("assets/wall3.png");
let texture3 = loadTexture("assets/wood.jpg");
let texture3B = loadTexture("assets/wood_2.jpg");

let goldTexture = loadTexture("assets/gold.png");

let metal1 = loadTexture("assets/metal2.png");

let texture4 = loadTexture("assets/metal_floor_prev2.jpg");

let skinTexture = loadTexture("assets/skin.jpeg");

let boxTexture1 = loadTexture("assets/cube-wood.png");

// Create scene
let scene = new Scene();

let pillar1 = new Cube(-.7, .4, -9, .25, 1.8, .3, texture4);
let pillar2 = new Cube(1.3, .4, -9, .25, 1.8, .3, texture4);

let pillar1Connect = new Cube(-.7, 1.3, -9, .5, .5, .25, texture4, 0, 0, .8);
let pillar2Connect = new Cube(1.3, 1.3, -9, .5, .5, .25, texture4, 0, 0, .8);

let wallPillar = new Cube(-2.9, 0, -9, .2, 1.6, .6, texture4);
let wallPillarRight = new Cube(3.75, 0, -9, .2, 1.6, .6, texture4);

let roofPillarSlant = new Cube(-2.2, 1.1, -9, .3, 1.9, .6, texture4, 0, 0, -1.1);
let roofPillarSlantRight = new Cube(2.8, 1.13, -9, .3, 1.9, .6, texture4, 0, 0, 1.1);

let mainRoofBind = new Cube(.3, 1.5, -9, 3.5, .45, .25, texture4);

let centerLeftWall = new Plane(-1.15, .35, -11.6, 5, 2, texture2, 0, 1.55, 0, .7);
let centerRightWall = new Plane(.8, .35, -11.6, 5, 2, texture2, 0, 1.55, 0, .7);

let doorEdgeTop = new Cube(.15, 1.5, 5.5, 2, .2, .2, texture4);
let doorEdgeLeft = new Cube(1, .37, 5.5, .2, 2, .2, texture4);
let doorEdgeRight = new Cube(-.7, .37, 5.5, .2, 2, .2, texture4);

let box1 = new Cube(1, -.34, -13, .3, .3, .3, boxTexture1, 0, 0, 0, 3.3);
let box2 = new Cube(3, -.17, 4.8, .3, .3, .3, boxTexture1, 0, 0, 0, 3.3);
let box3 = new Cube(3, -.17, 5.8, .3, .3, .3, boxTexture1, 0, 0, 0, 3.3);
let box4 = new Cube(-2, 0, -7, 1.3, 1.3, 1.3, metal1, 0, 0, 0, 1.3);
// first room

let floor1 = new Plane(0, -1, -9, 8, 40, texture1, -1.58, 0, 0, .7);
let leftWall1 = new Plane(-3.5, 0, -9, 40, 2, texture2, 0, 1.55, 0, .7);
let leftRoof1 = new Plane(-2.6, 2, -9, 40, 2, texture3, .9, 1.55, 0, .7);
let upRoof1 = new Plane(.5, 2.3, -9, 5, 40, texture3B, 1.55, 0, 0, .7);
let rightRoof1 = new Plane(2.8, 2, -9, 40, 3, texture3B, 2, 1.6, 0, .7);

let rightWall1 = new Plane(4.3, 0, -9, 40, 3, texture2, 0, -1.6, 0, .7);

let centerLeftRoof = new Plane(-.4, 1.9, -11.6, 4.6, 1.1, texture3B, 1.1, 1.55, 0, .7);
let centerRightRoof = new Plane(1, 1.9, -11.6, 4.6, 1.5, texture3B, 1.1, -1.55, 0, .7);

let backWall = new Plane(0, .8, -14, 8, 3, texture2, 0, 0, 0, .7);
let frontWall = new Plane(-.4, .8, 10.2, 8, 3, texture2, 0, 0, 0, .7);
let roomWall1 = new Plane(-2, .8, 5, 2.6, 3, texture2, 0, 0, 0, .7);
let roomWall2 = new Plane(2.3, .8, 5, 2.6, 3, texture2, 0, 0, 0, .7);
let roomWall3Top = new Plane(.3, 1.94, 5, 2, 1, texture2, 0, 0, 0, .7);

lightCube = new Light(light.position[0], light.position[1], light.position[2], .2, .2, .2);
lightCube2 = new Light(light2.position[0], light2.position[1], light2.position[2], .2, .2, .2, light2.color, light2);
lightCube3 = new Light(light3.position[0], light3.position[1], light3.position[2], .2, .2, .2, light3.color, light3);

let Jesus = new Model("assets/models/jesus.obj", 0, -.1, -5, goldTexture, .08);

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
    doorEdgeTop,

    box1,
    box2,
    box3,
    box4,

    Jesus,

    lightCube,
    lightCube2,
    lightCube3,
];

// Set up camera
const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();
mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 1000);

let lastTime = performance.now();

function animate() {
    const now = performance.now();
    const deltaTime = (now - lastTime) / 1000; // seconds
    lastTime = now;
    moveCamera(); // updates camera.position and camera.direction

    const up = vec3.fromValues(0, 1, 0); // Y axis is up

    let target = vec3.create();
    vec3.add(target, camera.position, camera.noYdirection);
    const renderPos = applyViewBob(deltaTime);
    mat4.lookAt(viewMatrix, renderPos, vec3.add(vec3.create(), renderPos, camera.direction), up);

    scene.render(viewMatrix, projectionMatrix);
    requestAnimationFrame(animate);
}
animate();
