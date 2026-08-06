import * as THREE from "three";

export class DrawerFront {

    constructor(material, width, height) {

        this.mesh = new THREE.Mesh(

            new THREE.BoxGeometry(

                width,

                height,

                0.019

            ),

            material

        );

        this.mesh.castShadow = true;

    }

}
