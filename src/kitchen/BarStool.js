import * as THREE from "three";

export class BarStool{

    constructor(materials){

        this.group=new THREE.Group();

        this.materials=materials;

        this.build();

    }

    build(){

        const seat=new THREE.Mesh(

            new THREE.CylinderGeometry(.18,.18,.05,24),

            this.materials.get("whiteOak")

        );

        seat.position.y=.75;

        seat.castShadow=true;

        this.group.add(seat);

        const pole=new THREE.Mesh(

            new THREE.CylinderGeometry(.03,.03,.68,16),

            this.materials.get("blackMetal")

        );

        pole.position.y=.41;

        pole.castShadow=true;

        this.group.add(pole);

        const footring=new THREE.Mesh(

            new THREE.TorusGeometry(.16,.012,12,32),

            this.materials.get("blackMetal")

        );

        footring.rotation.x=Math.PI/2;

        footring.position.y=.30;

        this.group.add(footring);

        const base=new THREE.Mesh(

            new THREE.CylinderGeometry(.17,.17,.02,24),

            this.materials.get("blackMetal")

        );

        base.position.y=.02;

        this.group.add(base);

        this.group.userData.selectable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Banco de bar";

    }

}
