"use strict"

class Grass {

    constructor() {

    }

    generateGrass() {
        var grassGeometry = new THREE.Geometry();
        var sprite = new THREE.TextureLoader().load("../Oblig4/textures/grassbillboard.png");
        var spreadCenter1 = new THREE.Vector3(4500, 400, 2500);
        var spreadCenter2 = new THREE.Vector3(100, 350, 300);
        var spreadCenter3 = new THREE.Vector3(3000, 390, -4000);
        var spreadCenter4 = new THREE.Vector3(-4900, 390, 5300);
        var spreadRadius1 = 700;
        var spreadRadius2 = 800;
        var spreadRadius3 = 800;
        var spreadRadius4 = 500;

        for (let i = 0; i < 300; i++) {
            this.addGrass(grassGeometry, spreadCenter1, spreadRadius1);
        }
        for (let i = 0; i < 300; i++) {
            this.addGrass(grassGeometry, spreadCenter2, spreadRadius2);
        }
        for (let i = 0; i < 300; i++) {
            this.addGrass(grassGeometry, spreadCenter3, spreadRadius3);
        }
        for (let i = 0; i < 300; i++) {
            this.addGrass(grassGeometry, spreadCenter4, spreadRadius4);
        }


        var grassMaterial = new THREE.PointsMaterial({
            size: 100,
            sizeAttenuation: true,
            map: sprite,
            alphaTest: 0.5,
            transparent: true
        });

        grassMaterial.color.setHSL(1.0, 0.3, 0.7);
        var particles = new THREE.Points(grassGeometry, grassMaterial);
        return particles;
    }

    addGrass(geometry, center, radius) {
        var vertex = randomGaussPositionMaker(center, radius);
        geometry.vertices.push(vertex);
    }
}