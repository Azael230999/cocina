import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";
import {WallCabinet} from "./WallCabinet.js";

export class WallRun{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.length=options.length??4.80;

        this.count=options.count??6;

        this.wallZ=options.wallZ??-1.925;

        this.build();

    }

    build(){

        this.buildBaseCabinets();

        this.buildWallCabinets();

    }

    buildBaseCabinets(){

        const slot=this.length/this.count;

        for(let i=0;i<this.count;i++){

            const cabinet=new BaseCabinet(

                this.materials,

                {

                    width:slot-.02,

                    drawers:2

                }

            );

            const x=-this.length/2+slot/2+i*slot;

            cabinet.group.position.set(

                x,

                0,

                this.wallZ+cabinet.depth/2

            );

            this.group.add(cabinet.group);

        }

    }

    buildWallCabinets(){

        const slot=this.length/this.count;

        const mountBottom=1.45;

        for(let i=0;i<this.count;i++){

            const cabinet=new WallCabinet(

                this.materials,

                {

                    width:slot-.02

                }

            );

            const x=-this.length/2+slot/2+i*slot;

            cabinet.group.position.set(

                x,

                mountBottom+cabinet.height/2,

                this.wallZ+cabinet.depth/2

            );

            this.group.add(cabinet.group);

        }

    }

}
