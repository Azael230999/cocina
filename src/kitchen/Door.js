import * as THREE from "three";

export class Door{

    constructor(){

        this.group=new THREE.Group();

        const wood=new THREE.MeshStandardMaterial({

            color:"#8d6a49"

        });

        const leaf=new THREE.Mesh(

            new THREE.BoxGeometry(

                .90,

                2.10,

                .04

            ),

            wood

        );

        leaf.position.y=1.05;

        leaf.castShadow=true;

        this.group.add(leaf);

        this.group.userData.selectable=true;

        this.group.userData.kind="fixture";

        this.group.userData.label="Puerta";

    }

}
