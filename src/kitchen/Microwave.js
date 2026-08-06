import * as THREE from "three";

export class Microwave{

    constructor(){

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        const body=new THREE.Mesh(

            new THREE.BoxGeometry(.45,.28,.35),

            new THREE.MeshPhysicalMaterial({

                color:"#e6e6e6",

                roughness:.4,

                metalness:.3

            })

        );

        body.position.y=.14;

        body.castShadow=true;

        this.group.add(body);

        const door=new THREE.Mesh(

            new THREE.BoxGeometry(.28,.22,.02),

            new THREE.MeshPhysicalMaterial({

                color:"#1b1b1b",

                roughness:.2,

                metalness:.4

            })

        );

        door.position.set(-.06,.14,.175);

        this.group.add(door);

        const panel=new THREE.Mesh(

            new THREE.BoxGeometry(.08,.22,.02),

            new THREE.MeshStandardMaterial({color:"#cfcfcf"})

        );

        panel.position.set(.17,.14,.175);

        this.group.add(panel);

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="appliance";

        this.group.userData.label="Microondas";

    }

}
