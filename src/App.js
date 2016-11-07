let instance = null;

class State {
    constructor() {

        if (instance) {
            return instance;
        } else {
            instance = this;
        }

        // Global variables
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.fov = 90;
        this.near = 1;
        this.far = 35000;
        this.canvas = document.getElementById("canvas");
        this.clock = new THREE.Clock();

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(this.fov, this.aspect, this.near, this.far);
        this.camera.position.z = 50;  // move a little
        this.scene.add(this.camera);

        // Light
        let amb = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(amb);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.width, this.height);

        return instance;
    }

    // Use this to get a reference to State object (can also just use new, same stuff, but this is alike to Java)
    static getInstance() {
        if (instance) {
            return instance;
        } else {
            return new State();
        }
    }
}

class App {

    constructor() {
        this.state = State.getInstance(); // get the state
        this.world = new World(this.state); // Get the world and inject the state

        // Controls
        this.controls = new THREE.FirstPersonControls(this.state.camera);
        this.controls.movementSpeed = 1000;
        this.controls.lookSpeed = 0.1

        this.composer = new THREE.EffectComposer(this.state.renderer);

        var renderPass = new THREE.RenderPass(this.state.scene, this.state.camera);
        this.composer.addPass(renderPass);

        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectCopy.renderToScreen = true;
        this.composer.addPass(effectCopy);

        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';

        //Rendering
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
    }

    render() {
        this.controls.update(this.state.clock.getDelta());
        this.state.renderer.clear();
        this.composer.render();
    }
}


