import * as THREE from "three";

export class Cooktop{

    constructor(){

        this.group=new THREE.Group();

        const glass=new THREE.MeshPhysicalMaterial({

            color:"#111",

            roughness:.05,

            metalness:.3

        });

        const top=new THREE.Mesh(

            new THREE.BoxGeometry(

                .75,

                .03,

                .52

            ),

            glass

        );

        top.castShadow=true;

        this.group.add(top);

        this.group.userData.selectable=true;

        this.group.userData.kind="appliance";

        this.group.userData.label="Cooktop";

    }

}
