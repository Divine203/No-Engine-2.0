class Light {
    constructor(x, y, z, w, h, d, color = light.color) {
        this.position = vec3.fromValues(x, y, z);
        this.size = vec3.fromValues(w, h, d);
        this.modelMatrix = mat4.create();

        this.color = [light.color[0], light.color[1], light.color[2]];

        this.initShaders();
        this.initBuffers();
    }

    initShaders() {
        this.vertexShader = getAndCompileShader("lightVertexShader");
        this.fragmentShader = getAndCompileShader("lightFragmentShader");

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, this.vertexShader);
        gl.attachShader(this.shaderProgram, this.fragmentShader);
        gl.linkProgram(this.shaderProgram);

        this.modelMatrixLocation = gl.getUniformLocation(this.shaderProgram, "modelMatrix");
        this.viewMatrixLocation = gl.getUniformLocation(this.shaderProgram, "viewMatrix");
        this.projectionMatrixLocation = gl.getUniformLocation(this.shaderProgram, "projectionMatrix");
        this.colorLocation = gl.getUniformLocation(this.shaderProgram, "color");
    }

    initBuffers() {
        this.vertices = [...cubeVertices];

        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.positionAttributeLocation = gl.getAttribLocation(this.shaderProgram, "position");
        gl.enableVertexAttribArray(this.positionAttributeLocation);
        gl.vertexAttribPointer(this.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        gl.bindVertexArray(null);
    }

    draw(viewMatrix, projectionMatrix) {
        mat4.identity(this.modelMatrix);
        mat4.translate(this.modelMatrix, this.modelMatrix, this.position);
        mat4.scale(this.modelMatrix, this.modelMatrix, this.size);

        gl.useProgram(this.shaderProgram);
        gl.bindVertexArray(this.vao);

        gl.uniformMatrix4fv(this.modelMatrixLocation, false, this.modelMatrix);
        gl.uniformMatrix4fv(this.viewMatrixLocation, false, viewMatrix);
        gl.uniformMatrix4fv(this.projectionMatrixLocation, false, projectionMatrix);

        gl.uniform4fv(this.colorLocation, [...this.color, 1.0]);

        // circular light motion
        const radius = 2.4;
        const speed = 0.001; // radians per frame
        const angle = performance.now() * speed;

        this.position[0] = (Math.cos(angle) * radius) + light.position[0];
        this.position[2] = (Math.sin(angle) * radius) + light.position[2];


        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}
