class Model {
    constructor(url, x, y, z, scale = 1, texture1) {
        this.position = vec3.fromValues(x, y, z);
        this.texture1 = texture1;
        this.scale = scale;
        this.vertices = [];
        this.uvs = [];
        this.modelMatrix = mat4.create();

        this.loadOBJ(url).then(() => {
            this.initShaders();
            this.initBuffers();
        });
    }

    async loadOBJ(url) {
        const text = await fetch(url).then(res => res.text());
        const lines = text.split('\n');

        let tempVertices = [], tempUVs = [], indices = [];

        for (let line of lines) {
            const parts = line.trim().split(' ');
            if (parts[0] === 'v') {
                tempVertices.push(parts.slice(1).map(Number));
            } else if (parts[0] === 'vt') {
                tempUVs.push(parts.slice(1).map(Number));
            } else if (parts[0] === 'f') {
                for (let i = 1; i <= 3; i++) {
                    const [vIdx, vtIdx] = parts[i].split('/').map(n => parseInt(n) - 1);
                    this.vertices.push(...tempVertices[vIdx]);
                    this.uvs.push(...tempUVs[vtIdx]);
                }
            }
        }
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

        gl.bindVertexArray(null);
    }

    draw(viewMatrix, projectionMatrix) {
        if (!this.shaderProgram || !this.vao) return;

        mat4.identity(this.modelMatrix); // line: 82

        mat4.scale(this.modelMatrix, this.modelMatrix, [this.scale, this.scale, this.scale]);

        mat4.translate(this.modelMatrix, this.modelMatrix, this.position);

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
