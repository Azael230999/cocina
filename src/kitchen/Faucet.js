import * as THREE from "three";

export class Faucet{

    constructor(){

        this.group=new THREE.Group();

        const chrome=new THREE.MeshPhysicalMaterial({

            color:"#d8d8d8",

            metalness:1,

            roughness:.15

        });

        const neck=new THREE.Mesh(

            new THREE.TorusGeometry(

                .11,

                .012,

                18,

                64,

                Math.PI

            ),

            chrome

        );

        neck.rotation.z=Math.PI/2;

        neck.position.y=.23;

        this.group.add(neck);

        this.group.userData.selectable=true;

        this.group.userData.kind="fixture";

        this.group.userData.label="Llave";

    }

}
