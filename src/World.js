class World {

    constructor(state) {
        this.state = state; // Store the injected state
        let scene = this.state.scene;
        let manager = new THREE.LoadingManager();
        let loader = new THREE.ObjectLoader(manager);

        // Light
        //let ambLight = new THREE.AmbientLight(0xFFFFFF);
        //scene.add(ambLight)


        var dirLight = new THREE.DirectionalLight(0xffffbb, 1);
        dirLight.position.set(4000, 600, 4000);
        dirLight.castShadow = true;
        dirLight.shadowCameraVisible = true;
        scene.add(dirLight);

        /*
         let pointLight = new THREE.PointLight(0xFFFFFF, 5);
         pointLight.castShadow = true;
         scene.add(pointLight);
         */

        // Terrain
        let heightMapWidth = 512;
        let heightMapDepth = 512;
        let worldMapWidth = 100 * heightMapWidth;
        let worldMapDepth = 100 * heightMapDepth;
        let worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        terrainMesh.receiveShadow = true;
        scene.add(terrainMesh);

        // Skybox
        let skybox = new Skybox();
        let skyboxMaterials = skybox.generateSkyboxMaterials();
        let skyboxWidth = worldMapWidth;
        let skyboxDepth = worldMapDepth;
        let skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        scene.add(this.cube);

        // Cactus
        let cactusFile = '../Oblig4/models/cactus.json';
        this.addObject(scene, loader, cactusFile, 3600, 550, 3600, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 4500, 600, 3600, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 5000, 600, 4000, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 5300, 600, 4300, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 5600, 600, 3600, 500, 500, 500);

        // Water
        var geometry = new THREE.PlaneBufferGeometry(worldMapWidth, worldMapDepth);

        var texture = THREE.ImageUtils.loadTexture("../Oblig4/textures/water.jpg");
        // assuming you want the texture to repeat in both directions:
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(4, 4);

        var material = new THREE.MeshLambertMaterial({map: texture, transparent: true, opacity: 0.7});
        var plane = new THREE.Mesh(geometry, material);
        plane.material.side = THREE.DoubleSide;
        plane.position.y = 194;
        plane.rotateX(Math.PI / 2);

        scene.add(plane);

        // Grass
        var grassGeometry = new THREE.Geometry();
        var sprite = new THREE.TextureLoader().load("../Oblig4/textures/grassbillboard.png");

        for (let i = 0; i < 100000; i++) {
            var vertex = new THREE.Vector3();
            vertex.x = i * Math.random() - 1000;
            vertex.y = 330;
            vertex.z = i * Math.random() - 1000 ;
            grassGeometry.vertices.push(vertex);
        }

        var vertex = new THREE.Vector3();
        vertex.x = 600;
        vertex.y = 330;
        vertex.z = 600;
        grassGeometry.vertices.push(vertex);

        var grassMaterial = new THREE.PointsMaterial({
            size: 100,
            sizeAttenuation: true,
            map: sprite,
            alphaTest: 0.5,
            transparent: true
        });
        grassMaterial.color.setHSL(1.0, 0.3, 0.7);
        var particles = new THREE.Points(grassGeometry, grassMaterial);
        scene.add(particles);

        // Fog
        scene.fog = new THREE.FogExp2( 0xefd1b5, 0.001 );

        // NB: Husk å blende overganger mellom teksturer!
    }

    addObject(scene, loader, file, posx, posy, posz, scalex, scaley, scalez) {

        loader.load(file, function (object) {

            object.castShadow = true;
            object.position.x = posx;
            object.position.y = posy;
            object.position.z = posz;
            object.scale.x = scalex;
            object.scale.y = scaley;
            object.scale.z = scalez;
            scene.add(object);
        });
    }
}