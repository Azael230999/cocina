import * as THREE from "three";

export class RangeHood{

    constructor(){

        this.group=new THREE.Group();

        this.build();

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="appliance";

        this.group.userData.label="Campana";

    }

    build(){

        this.buildCanopy();

        this.buildChimney();

    }

    buildCanopy(){

        const material=new THREE.MeshPhysicalMaterial({

            color:"#232323",

            metalness:.9,

            roughness:.3

        });

        const canopy=new THREE.Mesh(

            new THREE.BoxGeometry(

                .90,

                .14,

                .55

            ),

            material

        );

        canopy.castShadow=true;

        this.group.add(canopy);

    }

    buildChimney(){

        const material=new THREE.MeshPhysicalMaterial({

            color:"#2a2a2a",

            metalness:.9,

            roughness:.3

        });

        const chimney=new THREE.Mesh(

            new THREE.BoxGeometry(

                .30,

                .63,

                .30

            ),

            material

        );

        chimney.position.y=.385;

        this.group.add(chimney);

    }

}
