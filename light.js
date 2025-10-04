class Light {
    constructor(x, y, z, w, h, d, color = light.color, lightInit = light) {
        this.position = vec3.fromValues(x, y, z);
        this.size = vec3.fromValues(w, h, d);
        this.modelMatrix = mat4.create();

        this.color = [color[0], color[1], color[2]];

        this.lightInit = lightInit;

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
        const radius = 1.4;
        const speed = this.lightInit == light ? 0.0012 : -0.0012; // radians per frame
        const angle = performance.now() * speed;

        this.position[0] = (Math.cos(angle) * radius) + this.lightInit.position[0];
        this.position[2] = (Math.sin(angle) * radius) + this.lightInit.position[2];


        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }
}



/*

  <script id="objFragmentShader" type="x-shader/x-fragment">
        #version 300 es
        precision mediump float;

        in vec2 ftextureCoordinate;
        in vec4 vertexWorldPosition;
        in vec3 vertexNormal;

        uniform sampler2D sampler0;

        uniform vec3 lightColor;
        uniform vec3 lightPosition;

        uniform vec3 materialAmbient;
        uniform vec3 materialDiffuse;
        uniform vec3 materialSpecular;
        uniform float materialShininess;    

        uniform vec3 cameraPosition;

        out vec4 finalColor;

        void main() {
            vec3 lightDirection = normalize(lightPosition - vec3(vertexWorldPosition));
            vec3 viewDirection = normalize(cameraPosition - vec3(vertexWorldPosition));

            vec3 normalizedNormal = normalize(vertexNormal);

            // sample texture color
            vec4 tex = texture(sampler0, ftextureCoordinate);

            // Ambient
            vec3 ambient = materialAmbient * lightColor * tex.rgb;

            // Diffuse
            float diff = max(dot(normalizedNormal, lightDirection), 0.0);
            vec3 diffuse = diff * materialDiffuse * lightColor * tex.rgb;

            // Specular
            vec3 reflectedLightDirection = reflect(-lightDirection, normalizedNormal);
            float spec = pow(max(dot(reflectedLightDirection, viewDirection), 0.0), materialShininess);
            vec3 specular = spec * materialSpecular * lightColor;

            vec3 result = ambient + diffuse + specular;

            finalColor = vec4(result, tex.a);
        }

    </script>


*/