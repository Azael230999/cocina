import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";
import {WallCabinet} from "./WallCabinet.js";
import {Cooktop} from "./Cooktop.js";
import {RangeHood} from "./RangeHood.js";
import {Door} from "./Door.js";

export class BackWallRun{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.runLength=options.runLength??3.65;

        this.wallThickness=options.wallThickness??.15;

        this.cabinetDepth=.65;

        this.doorClearance=.20;

        this.build();

    }

    build(){

        this.buildCabinets();

        this.buildCooktop();

        this.buildHood();

        this.buildFlankingCabinets();

        this.buildDoor();

    }

    buildCabinets(){

        const slots=5;

        const cabinetRunLength=this.runLength-this.doorClearance;

        const slot=cabinetRunLength/slots;

        const z=this.wallThickness/2+this.cabinetDepth/2;

        for(let i=0;i<slots;i++){

            const cabinet=new BaseCabinet(

                this.materials,

                {

                    width:slot-.02,

                    depth:this.cabinetDepth,

                    drawers:2

                }

            );

            const x=slot/2+i*slot;

            cabinet.group.position.set(x,0,z);

            this.group.add(cabinet.group);

        }

    }

    buildCooktop(){

        const cooktop=new Cooktop();

        cooktop.group.position.set(

            this.runLength/2,

            .965,

            this.wallThickness/2+this.cabinetDepth/2

        );

        this.group.add(cooktop.group);

    }

    buildHood(){

        const hood=new RangeHood();

        hood.group.position.set(

            this.runLength/2,

            1.70,

            this.wallThickness/2+.30

        );

        this.group.add(hood.group);

    }

    buildFlankingCabinets(){

        const z=this.wallThickness/2+.175;

        const left=new WallCabinet(

            this.materials,

            {

                width:.35,

                height:.55,

                depth:.35

            }

        );

        left.group.position.set(.425,1.825,z);

        this.group.add(left.group);

        const right=new WallCabinet(

            this.materials,

            {

                width:.35,

                height:.55,

                depth:.35

            }

        );

        right.group.position.set(this.runLength-.425,1.825,z);

        this.group.add(right.group);

    }

    buildDoor(){

        const door=new Door();

        door.group.position.set(

            4.105,

            0,

            this.wallThickness/2+.02

        );

        this.group.add(door.group);

    }

}
