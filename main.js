// Prepare textures once
let texture1 = loadTexture("assets/cvlt-game-art-greatwalll1.jpg");

// Create scene
let scene = new Scene();

let cube1 = new Cube(0, 0, -7, 1, 1, 1, texture1);
let cube2 = new Cube(2, 0.5, -10, 1, 2, 0.5, texture1);

let plain1 = new Plain(1, 0, -9, 6, 6, texture1, 1.55);

scene.objects = [cube1, cube2, plain1];

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
