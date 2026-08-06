import * as THREE from "three";

export class Countertop {

    constructor(material, width, depth, thickness = 0.03) {

        this.mesh = new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                thickness,
                depth
            ),

            material

        );

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.mesh.userData.isSurface = true;

    }

}
