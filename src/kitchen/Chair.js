import * as THREE from "three";

export class Chair{

    constructor(materials){

        this.group=new THREE.Group();

        this.materials=materials;

        this.build();

    }

    build(){

        const seat=new THREE.Mesh(

            new THREE.BoxGeometry(.42,.04,.42),

            this.materials.get("whiteOak")

        );

        seat.position.y=.46;

        seat.castShadow=true;

        this.group.add(seat);

        const back=new THREE.Mesh(

            new THREE.BoxGeometry(.42,.42,.04),

            this.materials.get("whiteOak")

        );

        back.position.set(0,.68,-.19);

        back.castShadow=true;

        this.group.add(back);

        const legPositions=[

            [.17,-.17],

            [-.17,-.17],

            [.17,.17],

            [-.17,.17]

        ];

        for(const [x,z] of legPositions){

            const leg=new THREE.Mesh(

                new THREE.CylinderGeometry(.02,.02,.46,10),

                this.materials.get("graphite")

            );

            leg.position.set(x,.23,z);

            leg.castShadow=true;

            this.group.add(leg);

        }

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Silla";

    }

}
