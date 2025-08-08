class Scene {
    constructor() {
        this.objects = [];
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
