"use strict"

class Pyramid {
    constructor() {

    }

    createPyramid(scene, loader) {
        var pyramidFile = "../Oblig4/models/pyramid-advance-design.json";
        this.addObject(scene, loader, pyramidFile, 0, -50, -50, 40, 40, 40);
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