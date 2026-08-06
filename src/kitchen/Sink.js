import * as THREE from "three";

export class Sink{

    constructor(materials){

        this.group=new THREE.Group();

        const bowl=new THREE.Mesh(

            new THREE.BoxGeometry(

                .55,

                .22,

                .42

            ),

            materials.get("blackMetal")

        );

        bowl.position.y=-.10;

        this.group.add(bowl);

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="fixture";

        this.group.userData.label="Fregadero";

    }

}
