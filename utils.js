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

    if (shaderElement.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else if (shaderElement.type == "x-shader/x-fragment") {
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

function closestPointOnTriangle(p, a, b, c) {
    // from https://gdbooks.gitbooks.io/3dcollisions/content/Chapter4/closest_point_to_triangle.html
    const ab = vec3.sub(vec3.create(), b, a);
    const ac = vec3.sub(vec3.create(), c, a);
    const ap = vec3.sub(vec3.create(), p, a);

    const d1 = vec3.dot(ab, ap);
    const d2 = vec3.dot(ac, ap);
    if (d1 <= 0 && d2 <= 0) return a; // barycentric (1,0,0)

    const bp = vec3.sub(vec3.create(), p, b);
    const d3 = vec3.dot(ab, bp);
    const d4 = vec3.dot(ac, bp);
    if (d3 >= 0 && d4 <= d3) return b; // barycentric (0,1,0)

    const vc = d1 * d4 - d3 * d2;
    if (vc <= 0 && d1 >= 0 && d3 <= 0) {
        const v = d1 / (d1 - d3);
        return vec3.add(vec3.create(), a, vec3.scale(vec3.create(), ab, v));
    }

    const cp = vec3.sub(vec3.create(), p, c);
    const d5 = vec3.dot(ab, cp);
    const d6 = vec3.dot(ac, cp);
    if (d6 >= 0 && d5 <= d6) return c;

    const vb = d5 * d2 - d1 * d6;
    if (vb <= 0 && d2 >= 0 && d6 <= 0) {
        const w = d2 / (d2 - d6);
        return vec3.add(vec3.create(), a, vec3.scale(vec3.create(), ac, w));
    }

    const va = d3 * d6 - d5 * d4;
    if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
        const w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
        return vec3.add(vec3.create(), b, vec3.scale(vec3.create(), vec3.sub(vec3.create(), c, b), w));
    }

    const denom = 1 / (va + vb + vc);
    const v = vb * denom;
    const w = vc * denom;
    return vec3.add(vec3.create(), a,
        vec3.add(vec3.create(),
            vec3.scale(vec3.create(), ab, v),
            vec3.scale(vec3.create(), ac, w)
        )
    );
}

function handleCollisions(cameraPos, triangles, playerRadius) {
    for (let tri of triangles) {
        const closest = closestPointOnTriangle(cameraPos, tri.a, tri.b, tri.c);
        const diff = vec3.sub(vec3.create(), cameraPos, closest);
        const dist = vec3.length(diff);
        if (dist < playerRadius) {
            // Push camera out
            vec3.normalize(diff, diff);
            vec3.scaleAndAdd(cameraPos, closest, diff, playerRadius);
        }
    }
}
