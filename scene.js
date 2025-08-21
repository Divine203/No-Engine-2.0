class Scene {
    constructor() {
        this.objects = [];

        gl.enable(gl.BLEND); // transparency blending...
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    render(viewMatrix, projectionMatrix) {
        gl.clearColor(0, 0, 0, 1);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        for (let obj of this.objects) {
            obj.draw(viewMatrix, projectionMatrix);
        }
    }
}
