
class UFO {

    constructor() {

    }

    createUFO(camera, loader) {
        var UFOFile = "../Oblig4/models/space-invader.json";
        this.loadObject(camera, loader,UFOFile, 0, -100, -250, 50, 50, 50);


    }

    loadObject(scene, loader, file, posx, posy, posz, scalex, scaley, scalez) {

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