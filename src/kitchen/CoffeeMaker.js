import * as THREE from "three";

export class CoffeeMaker{

    constructor(){

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        const base=new THREE.Mesh(

            new THREE.BoxGeometry(.18,.32,.22),

            new THREE.MeshPhysicalMaterial({

                color:"#232323",

                roughness:.35,

                metalness:.5

            })

        );

        base.position.y=.16;

        base.castShadow=true;

        this.group.add(base);

        const tank=new THREE.Mesh(

            new THREE.CylinderGeometry(.03,.03,.20,12),

            new THREE.MeshPhysicalMaterial({

                color:"#bcd6d6",

                transparent:true,

                opacity:.5,

                roughness:.1

            })

        );

        tank.position.set(-.09,.30,0);

        this.group.add(tank);

        const carafe=new THREE.Mesh(

            new THREE.CylinderGeometry(.045,.04,.11,16),

            new THREE.MeshPhysicalMaterial({

                color:"#3a2a20",

                transparent:true,

                opacity:.7,

                roughness:.1

            })

        );

        carafe.position.set(.02,.055,0);

        this.group.add(carafe);

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="appliance";

        this.group.userData.label="Cafetera";

    }

}
