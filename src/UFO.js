
class UFO {
    constructor() {

    }

    createUFO(camera, loader) {
        let UFOFile = "../Oblig4/models/space-invader.json";
        this.addObject(camera, loader,UFOFile, 0, -100, -250, 50, 50, 50);
        let node = THREE
    }

    addObject(scene, loader, file, posx, posy, posz, scalex, scaley, scalez) {

        loader.load(file, function (object) {

            object.castShadow = true;
            object.receiveShadow = true;
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