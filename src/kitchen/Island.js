import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";

export class Island{

    constructor(materials){

        this.group=new THREE.Group();

        this.materials=materials;

        this.build();

    }

    build(){

        const left=new BaseCabinet(

            this.materials,

            {

                width:.75,

                drawers:3

            }

        );

        left.group.position.x=-0.375;

        this.group.add(left.group);

        const right=new BaseCabinet(

            this.materials,

            {

                width:.75,

                drawers:3

            }

        );

        right.group.position.x=.375;

        this.group.add(right.group);

        const countertop=new THREE.Mesh(

            new THREE.BoxGeometry(

                1.60,

                .05,

                1.00

            ),

            this.materials.get("calacatta")

        );

        countertop.position.y=.925;

        countertop.castShadow=true;

        this.group.add(countertop);

    }

}
