"use strict"

class Cactus {
    construtor() {

    }

    setUpCacti(scene, loader) {
        let cactusFile = '../Oblig4/models/cactus.json';
        this.addObject(scene, loader, cactusFile, 2500, 300, 3238, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 3530, 280, 2531, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 5018, 300, 3894, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 538, 300, 2819, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 4274, 300, 4576, 300, 300, 300);

        this.addObject(scene, loader, cactusFile, 1000, 300, -500, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 600, 300, 5000, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, -100, 300, -600, 300, 300, 300);

        this.addObject(scene, loader, cactusFile, 3000, 380, -4253, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 3200, 380, -4576, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 4274, 380, -4976, 300, 300, 300);

        this.addObject(scene, loader, cactusFile, -4974, 350, 4976, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, -4574, 350, 4576, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, -5374, 350, 4176, 300, 300, 300);
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