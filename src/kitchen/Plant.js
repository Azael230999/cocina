import * as THREE from "three";

export class Plant{

    constructor(){

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        const potMaterial=new THREE.MeshStandardMaterial({

            color:"#a7623f",

            roughness:.9

        });

        const pot=new THREE.Mesh(

            new THREE.CylinderGeometry(.13,.10,.22,20),

            potMaterial

        );

        pot.position.y=.11;

        pot.castShadow=true;

        this.group.add(pot);

        const leafMaterial=new THREE.MeshStandardMaterial({

            color:"#4c6b3f",

            roughness:.8

        });

        const leafPositions=[

            [0,.55,0,.20],

            [.08,.45,.06,.16],

            [-.09,.48,-.05,.17],

            [.02,.62,-.08,.15]

        ];

        for(const [x,y,z,scale] of leafPositions){

            const leaf=new THREE.Mesh(

                new THREE.ConeGeometry(scale*.35,scale,8),

                leafMaterial

            );

            leaf.position.set(x,y,z);

            leaf.castShadow=true;

            this.group.add(leaf);

        }

        this.group.userData.selectable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Planta";

    }

}
