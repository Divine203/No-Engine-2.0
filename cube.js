class Cube {
    constructor(x, y, z, w, h, d, texture1, rx = 0, ry = 0, rz = 0, rpu = 1.2) {
        this.position = vec3.fromValues(x, y, z);
        this.size = vec3.fromValues(w, h, d);
        this.rotation = vec3.fromValues(rx, ry, rz);
        this.modelMatrix = mat4.create();

        this.texture1 = texture1;

        this.material = gold;

        this.rpu = rpu;

        this.initShaders();
        this.initBuffers();
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
    }

    initBuffers() {
        this.vertices = [...cubeVertices];
        this.normals = [...cubeNormals];
        this.textureCoordinates = cubeTextureCoordinates(this.rpu, this.size);

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.positionAttributeLocation = gl.getAttribLocation(this.shaderProgram, "position");
        gl.enableVertexAttribArray(this.positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        this.normalsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);

        this.vertexNormalAttributeLocation = gl.getAttribLocation(this.shaderProgram, "normal");
        gl.enableVertexAttribArray(this.vertexNormalAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
        gl.vertexAttribPointer(this.vertexNormalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        this.textureCoordinatesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinatesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), gl.STATIC_DRAW);

        this.textureCoordinateAttributeLocation = gl.getAttribLocation(this.shaderProgram, "textureCoordinate");
        gl.enableVertexAttribArray(this.textureCoordinateAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordinatesBuffer);
        gl.vertexAttribPointer(this.textureCoordinateAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
    }

    draw(viewMatrix, projectionMatrix) {
        mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, this.position);

        mat4.rotateX(this.modelMatrix, this.modelMatrix, this.rotation[0]);
        mat4.rotateY(this.modelMatrix, this.modelMatrix, this.rotation[1]);
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, this.rotation[2]);

        mat4.scale(this.modelMatrix, this.modelMatrix, this.size);

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
