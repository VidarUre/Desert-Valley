"use strict"

var container, stats;

var camera, controls, scene, renderer;

var terrainMesh;

var composer;

window.onload = function () {
    "use strict";
    init();
    animate();
};

function init() {
    "use strict";

    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    camera.name = 'camera';

    scene = new THREE.Scene();

    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 1000;
    controls.lookSpeed = 0.1;

    terrainMesh = Terrain.init(worldMapWidth, worldMapHeight, worldMapDepth, scene);

    //camera.position.y = terrainMesh.getHeightAtPoint(camera.position) + 500;
    camera.position.set(-worldMapWidth/5, 2*worldMapMaxHeight, 0);
    //camera.lookAt(new THREE.Vector3(0,0,0));

    // There are several other model loaders for other types, just look in Three.js' example folder.
    var objectMaterialLoader = new THREE.OBJMTLLoader();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xbfd1e5);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    composer = new THREE.EffectComposer(renderer);

    var renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    var bloomPassDefault = new THREE.BloomPass();
    //var bloomPass = new THREE.BloomPass(0.5, 16, 0.5, 512);
    //composer.addPass(bloomPassDefault);

    // Fill/replace with more postprocess passes
    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    composer.addPass(effectCopy);


    //
    // Make the renderer visible py associating it with the document.
    //

    container.innerHTML = "";

    container.appendChild(renderer.domElement);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    //


    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    "use strict";
    requestAnimationFrame(animate);

    // Perform state updates here

    // Call render
    render();
    stats.update();
}

function render() {
    "use strict";
    controls.update(clock.getDelta());
    renderer.clear();
    //renderer.render(scene, camera);
    composer.render();
}

function generateGaussPositionAndCorrectHeight(terrain, center, radius) {
    "use strict";
    var pos = randomGaussPositionMaker(center, radius);
    //var pos = randomUniformPositionMaker(center, radius);
    return terrain.computePositionAtPoint(pos);
}

function positionValidator(terrain, minHeight, maxHeight, maxAngle, candidatePos) {
    "use strict";

    var normal = terrain.computeNormalAtPoint(candidatePos);
    var notTooSteep = true;

    var angle = normal.angleTo(new THREE.Vector3(0, 1, 0));
    //var maxAngle = 30 * Math.PI/180;

    if (angle > maxAngle) {
        notTooSteep = false;
    }

    var withinTerrainBoundaries = terrain.withinBoundaries(candidatePos);
    var withinHeight = (candidatePos.y >= minHeight) && (candidatePos.y <= maxHeight);

    return withinTerrainBoundaries && withinHeight && notTooSteep;
}

function onProgress(xhr) {
    "use strict";
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
}

function onError(xhr) {
    "use strict";
}