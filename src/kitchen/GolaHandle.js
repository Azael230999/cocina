import * as THREE from "three";

export class GolaHandle {

    constructor(length) {

        this.mesh = new THREE.Mesh(

            new THREE.BoxGeometry(

                length,

                0.018,

                0.018

            ),

            new THREE.MeshStandardMaterial({

                color:"#1e1e1e",

                metalness:.95,

                roughness:.25

            })

        );

    }

}
