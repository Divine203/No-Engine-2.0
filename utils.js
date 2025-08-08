function loadTexture(url) {
    const texture = gl.createTexture();
    const image = new Image();
    image.src = url;

    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        // Upload the image to the GPU
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

        // Set texture filtering
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Set texture wrap mode to repeat
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    };

    return texture;
}


const getAndCompileShader = (id) => {
    let shader;
    let shaderElement = document.getElementById(id);
    let shaderText = shaderElement.textContent.trim();

    if (id.includes('vertex')) {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }

    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}
