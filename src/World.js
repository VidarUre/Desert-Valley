class World {

    constructor(state) {
        this.state = state; // Store the injected state

        var manager = new THREE.LoadingManager();
        var loader = new THREE.OBJLoader(manager);

        // Terrain
        let heightMapWidth = 512;
        let heightMapDepth = 512;
        let worldMapWidth = 100 * heightMapWidth;
        let worldMapDepth = 100 * heightMapDepth;
        let worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        this.state.scene.add(terrainMesh);

        // Skybox
        let skybox = new Skybox();
        let skyboxMaterials = skybox.generateSkyboxMaterials();
        let skyboxWidth = worldMapWidth;
        let skyboxDepth = worldMapDepth;
        let skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        this.state.scene.add(this.cube);

        // Palace?

        // Palm trees?

        // Camels

        // Cactus

        //this.setupTrees(terrainMesh, worldMapWidth, worldMapDepth, worldMapMaxHeight);

        loader.load( '../Oblig4/models/lowPolyTree/lowpolytree.obj', function ( object ) {

            object.position.x = - 60;
            object.rotation.x = 20* Math.PI / 180;
            object.rotation.z = 20* Math.PI / 180;
            object.scale.x = 30;
            object.scale.y = 30;
            object.scale.z = 30;
            obj = object
            scene.add( obj );

        } );

        // Water

        // Grass

        // Light
        let amb = new THREE.AmbientLight(0xFFFFFF);
        this.state.scene.add(amb)

        // Fog
    }

    /*
    setupTrees(terrain, worldMapWidth, worldMapDepth, worldMapMaxHeight) {
        "use strict";
        var maxNumObjects = 200;
        var spreadCenter = new THREE.Vector3(-0.2*worldMapWidth, 0, -0.2*worldMapDepth);
        var spreadRadius = 0.1*worldMapWidth;
        //var geometryScale = 30;

        var minHeight = 0.05*worldMapMaxHeight;
        var maxHeight = 0.3*worldMapMaxHeight;
        var maxAngle = 30 * Math.PI / 180;

        var scaleMean = 100;
        var scaleSpread = 40;
        var scaleMinimum = 10;

        var generatedAndValidPositions = generateRandomData(maxNumObjects,
            this.generateGaussPositionAndCorrectHeight.bind(null, terrain, spreadCenter, spreadRadius),
            this.positionValidator.bind(null, terrain, minHeight, maxHeight, maxAngle), 5);

        var generatedAndValidScales = generateRandomData(generatedAndValidPositions.length,

            // Generator function
            function() { return Math.abs(scaleMean + randomGauss()*scaleSpread); },

            // Validator function
            function(scale) { return scale > scaleMinimum; }
        );

        var numObjects = generatedAndValidPositions.length;

        let objectMaterialLoader = new THREE.OBJMTLLoader();

        objectMaterialLoader.load(
            '../Oblig4/models/lowPolyTree/lowpolytree.obj',
            '../Oblig4/models/lowPolyTree/lowpolytree.mtl',
            function (loadedObject) {
                "use strict";
                // Custom function to handle what's supposed to happen once we've loaded the model

                var bbox = new THREE.Box3().setFromObject(loadedObject);
                console.log(bbox);

                for (var i = 0; i < numObjects; ++i) {
                    var object = loadedObject.clone();

                    // We should know where the bottom of our object is
                    object.position.copy(generatedAndValidPositions[i]);
                    object.position.y -= bbox.min.y*generatedAndValidScales[i];

                    object.scale.set(
                        generatedAndValidScales[i],
                        generatedAndValidScales[i],
                        generatedAndValidScales[i]
                    );

                    object.name = "LowPolyTree";

                    terrain.add(object);
                }
            }, this.onProgress, this.onError);
    }

    generateGaussPositionAndCorrectHeight(terrain, center, radius) {
    "use strict";
    var pos = randomGaussPositionMaker(center, radius);
    //var pos = randomUniformPositionMaker(center, radius);
    return terrain.computePositionAtPoint(pos);
    }

    positionValidator(terrain, minHeight, maxHeight, maxAngle, candidatePos) {
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

    onProgress(xhr) {
    "use strict";
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
}

    onError(xhr) {
    "use strict";
}
*/
}