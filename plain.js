class Plain {
    constructor(x, y, z, w, h, texture1, rx = 0, ry = 0, rz = 0, rpu = .7) { // rpu = repeate per unit
        this.position = vec3.fromValues(x, y, z);
        this.size = vec3.fromValues(w, h, 1);
        this.rotation = vec3.fromValues(rx, ry, rz);
        this.modelMatrix = mat4.create();

        this.rpu = rpu;
        this.texture1 = texture1;

        this.initShaders();
        this.initBuffers();
    }

    initShaders() {
        this.vertexShader = getAndCompileShader("vertexShader");
        this.fragmentShader = getAndCompileShader("fragmentShader");

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, this.vertexShader);
        gl.attachShader(this.shaderProgram, this.fragmentShader);
        gl.linkProgram(this.shaderProgram);

        this.modelMatrixLocation = gl.getUniformLocation(this.shaderProgram, "modelMatrix");
        this.viewMatrixLocation = gl.getUniformLocation(this.shaderProgram, "viewMatrix");
        this.projectionMatrixLocation = gl.getUniformLocation(this.shaderProgram, "projectionMatrix");

        this.sampler0Location = gl.getUniformLocation(this.shaderProgram, "sampler0");
    }

    initBuffers() {
        this.vertices = [...plainVertices];

        // How many times to repeat per unit
        let repeatPerUnit = this.rpu; // tile per 1 unit length

        this.textureCoordinates = [
            0.0, 0.0,
            this.size[0] * repeatPerUnit, 0.0,
            this.size[0] * repeatPerUnit, this.size[1] * repeatPerUnit,
            this.size[0] * repeatPerUnit, this.size[1] * repeatPerUnit,
            0.0, this.size[1] * repeatPerUnit,
            0.0, 0.0
        ];


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

        gl.bindVertexArray(null);
    }

    draw(viewMatrix, projectionMatrix) {
        mat4.identity(this.modelMatrix);

        mat4.translate(this.modelMatrix, this.modelMatrix, this.position);

        // the order matters
        mat4.rotateZ(this.modelMatrix, this.modelMatrix, this.rotation[2]);
        mat4.rotateY(this.modelMatrix, this.modelMatrix, this.rotation[1]);
        mat4.rotateX(this.modelMatrix, this.modelMatrix, this.rotation[0]);


        mat4.scale(this.modelMatrix, this.modelMatrix, this.size);

        gl.useProgram(this.shaderProgram);
        gl.bindVertexArray(this.vao);

        gl.uniformMatrix4fv(this.modelMatrixLocation, false, this.modelMatrix);
        gl.uniformMatrix4fv(this.viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(this.projectionMatrixLocation, false, projectionMatrix);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        gl.uniform1i(this.sampler0Location, 0);

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}