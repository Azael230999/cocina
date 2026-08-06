import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";

export class Island{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.width=options.width??1.60;

        this.depth=options.depth??1.00;

        this.build();

    }

    build(){

        const cabinetWidth=this.width/2-.01;

        const cabinetDepth=this.depth-.05;

        const left=new BaseCabinet(

            this.materials,

            {

                width:cabinetWidth,

                depth:cabinetDepth,

                drawers:3

            }

        );

        left.group.position.x=-(cabinetWidth/2+.005);

        this.group.add(left.group);

        const right=new BaseCabinet(

            this.materials,

            {

                width:cabinetWidth,

                depth:cabinetDepth,

                drawers:3

            }

        );

        right.group.position.x=cabinetWidth/2+.005;

        this.group.add(right.group);

        const countertop=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                .05,

                this.depth

            ),

            this.materials.get("calacatta")

        );

        countertop.position.y=.925;

        countertop.castShadow=true;

        countertop.userData.isSurface=true;

        this.group.add(countertop);

    }

}
