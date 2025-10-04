class Model {
    constructor(url, x, y, z, texture1, scale = 1) {
        this.position = vec3.fromValues(x, y, z);
        this.texture1 = texture1;
        this.scale = scale;
        this.vertices = [];
        this.normals = [];
        this.uvs = [];
        this.modelMatrix = mat4.create();

        this.material = gold;

        this.loadOBJ(url).then(() => {
            this.initShaders();
            this.initBuffers();
        });
    }

    async loadOBJ(url) {
        const text = await fetch(url).then(res => res.text());
        const lines = text.split('\n');

        let tempVertices = [], tempUVs = [], tempNormals = [];

        for (let line of lines) {
            const parts = line.trim().split(/\s+/);
            if (parts[0] === 'v') {
                tempVertices.push(parts.slice(1).map(Number));
            } else if (parts[0] === 'vt') {
                tempUVs.push(parts.slice(1).map(Number));
            } else if (parts[0] === 'vn') {
                tempNormals.push(parts.slice(1).map(Number));
            } else if (parts[0] === 'f') {
                for (let i = 1; i <= 3; i++) {
                    const indices = parts[i].split('/');
                    const vIdx = parseInt(indices[0]) - 1;
                    const vtIdx = indices[1] ? parseInt(indices[1]) - 1 : null;
                    const vnIdx = indices[2] ? parseInt(indices[2]) - 1 : null;

                    // push vertex position
                    this.vertices.push(...tempVertices[vIdx]);

                    // push uv
                    if (vtIdx !== null && tempUVs[vtIdx]) {
                        this.uvs.push(...tempUVs[vtIdx]);
                    } else {
                        this.uvs.push(0, 0);
                    }

                    // push normal
                    if (vnIdx !== null && tempNormals[vnIdx]) {
                        this.normals.push(...tempNormals[vnIdx]);
                    } else {
                        // fallback (we'll compute later if missing)
                        this.normals.push(0, 0, 0);
                    }
                }
            }
        }
    }

    initShaders() {
        this.vertexShader = getAndCompileShader("objVertexShader");
        this.fragmentShader = getAndCompileShader("objFragmentShader");

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, this.vertexShader);
        gl.attachShader(this.shaderProgram, this.fragmentShader);
        gl.linkProgram(this.shaderProgram);

        this.modelMatrixLocation = gl.getUniformLocation(this.shaderProgram, "modelMatrix");
        this.viewMatrixLocation = gl.getUniformLocation(this.shaderProgram, "viewMatrix");
        this.projectionMatrixLocation = gl.getUniformLocation(this.shaderProgram, "projectionMatrix");

        this.lightColorLocation = gl.getUniformLocation(this.shaderProgram, "lightColor");
        this.lightPositionLocation = gl.getUniformLocation(this.shaderProgram, "lightPosition");
        this.cameraPositionLocation = gl.getUniformLocation(this.shaderProgram, "cameraPosition");

        this.materialAmbientLocation = gl.getUniformLocation(this.shaderProgram, "materialAmbient");
        this.materialDiffuseLocation = gl.getUniformLocation(this.shaderProgram, "materialDiffuse");
        this.materialSpecularLocation = gl.getUniformLocation(this.shaderProgram, "materialSpecular");
        this.materialShininessLocation = gl.getUniformLocation(this.shaderProgram, "materialShininess");

        this.sampler0Location = gl.getUniformLocation(this.shaderProgram, "sampler0");
        this.sampler1Location = gl.getUniformLocation(this.shaderProgram, "sampler1");
    }

    initBuffers() {
        this.vertices = [...this.vertices];
        this.textureCoordinates = [...this.uvs];

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.positionAttributeLocation = gl.getAttribLocation(this.shaderProgram, "position");
        gl.enableVertexAttribArray(this.positionAttributeLocation);
        gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        this.textureCoordinatesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinatesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), gl.STATIC_DRAW);

        this.textureCoordinateAttributeLocation = gl.getAttribLocation(this.shaderProgram, "textureCoordinate");
        gl.enableVertexAttribArray(this.textureCoordinateAttributeLocation);
        gl.vertexAttribPointer(this.textureCoordinateAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        this.normalsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

        this.vertexNormalAttributeLocation = gl.getAttribLocation(this.shaderProgram, "normal");
        gl.enableVertexAttribArray(this.vertexNormalAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
        gl.vertexAttribPointer(this.vertexNormalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
    }

    draw(viewMatrix, projectionMatrix) {
        if (!this.shaderProgram || !this.vao) return;

        mat4.identity(this.modelMatrix); // line: 82

        mat4.translate(this.modelMatrix, this.modelMatrix, this.position);

        mat4.scale(this.modelMatrix, this.modelMatrix, [this.scale, this.scale, this.scale]);

        gl.useProgram(this.shaderProgram);
        gl.bindVertexArray(this.vao);

        gl.uniform3fv(this.lightColorLocation, new Float32Array([...light.color, ...light2.color, ...light3.color]));
        gl.uniform3fv(this.lightPositionLocation, new Float32Array([...lightCube.position, ...lightCube2.position, ...lightCube3.position]));
        gl.uniform3fv(this.cameraPositionLocation, new Float32Array(camera.position));


        gl.uniform3fv(this.materialAmbientLocation, this.material.ambient);
        gl.uniform3fv(this.materialDiffuseLocation, this.material.diffuse);
        gl.uniform3fv(this.materialSpecularLocation, this.material.specular);
        gl.uniform1f(this.materialShininessLocation, this.material.shininess);

        gl.uniformMatrix4fv(this.modelMatrixLocation, false, this.modelMatrix);
        gl.uniformMatrix4fv(this.viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(this.projectionMatrixLocation, false, projectionMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        gl.uniform1i(this.sampler0Location, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}
