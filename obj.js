const cubeVertices = [
    // Front face (z = 0.5)
    -0.5, -0.5, 0.5,  // bottom-left
    0.5, -0.5, 0.5,  // bottom-right
    0.5, 0.5, 0.5,  // top-right
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,

    // Back face (z = -0.5)
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,

    // Left face (x = -0.5)
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,

    // Right face (x = 0.5)
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,

    // Top face (y = 0.5)
    -0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,

    // Bottom face (y = -0.5)
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,
];

const plainVertices = [
    -0.5, -0.5, 0.5,  // bottom-left
    0.5, -0.5, 0.5,  // bottom-right
    0.5, 0.5, 0.5,  // top-right
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,
];

const textureCoordinates = [
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    1.0, 0.0,
    0.0, 0.0,
    0.0, 1.0,

    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    1.0, 0.0,
    0.0, 0.0,
    0.0, 1.0,
];

const cubeTextureCoordinates = (repeatPerUnit, size) => {
  const [w, h, d] = size;

  const uFH = w * repeatPerUnit; // front/back U
  const vFH = h * repeatPerUnit; // front/back V

  const uLD = d * repeatPerUnit; // left/right U (uses depth)
  const vLD = h * repeatPerUnit; // left/right V (uses height)

  const uTD = w * repeatPerUnit; // top/bottom U (uses width)
  const vTD = d * repeatPerUnit; // top/bottom V (uses depth)

  return [
    // FRONT face (w x h)  — vertices: bottom-left, bottom-right, top-right, top-right, top-left, bottom-left
    0, 0,
    uFH, 0,
    uFH, vFH,
    uFH, vFH,
    0, vFH,
    0, 0,

    // BACK face (w x h) — vertices: bottom-left, top-left, top-right, top-right, bottom-right, bottom-left
    0, 0,
    0, vFH,
    uFH, vFH,
    uFH, vFH,
    uFH, 0,
    0, 0,

    // LEFT face (d x h) — vertices: bottom-back, bottom-front, top-front, top-front, top-back, bottom-back
    0, 0,
    uLD, 0,
    uLD, vLD,
    uLD, vLD,
    0, vLD,
    0, 0,

    // RIGHT face (d x h) — vertices: bottom-back, top-back, top-front, top-front, bottom-front, bottom-back
    0, 0,
    0, vLD,
    uLD, vLD,
    uLD, vLD,
    uLD, 0,
    0, 0,

    // TOP face (w x d) — vertices: back-left, front-left, front-right, front-right, back-right, back-left
    0, 0,
    0, vTD,
    uTD, vTD,
    uTD, vTD,
    uTD, 0,
    0, 0,

    // BOTTOM face (w x d) — vertices: back-left, back-right, front-right, front-right, front-left, back-left
    0, 0,
    uTD, 0,
    uTD, vTD,
    uTD, vTD,
    0, vTD,
    0, 0,
  ];
};
