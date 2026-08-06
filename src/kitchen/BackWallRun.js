import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";
import {WallCabinet} from "./WallCabinet.js";
import {Cooktop} from "./Cooktop.js";
import {RangeHood} from "./RangeHood.js";
import {Door} from "./Door.js";
import {Refrigerator} from "./Refrigerator.js";

export class BackWallRun{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.wallThickness=options.wallThickness??.15;

        this.cabinetDepth=.65;

        this.doorCenterX=4.105;

        this.doorWidth=.90;

        this.fridgeWidth=.75;

        this.fridgeGap=.05;

        const doorLeftEdge=this.doorCenterX-this.doorWidth/2;

        this.fridgeZStart=doorLeftEdge-this.fridgeGap-this.fridgeWidth;

        this.cabinetRunLength=this.fridgeZStart-this.fridgeGap;

        this.build();

    }

    build(){

        this.buildCabinets();

        this.buildCooktop();

        this.buildHood();

        this.buildFlankingCabinets();

        this.buildRefrigerator();

        this.buildDoor();

    }

    buildCabinets(){

        const slots=4;

        const slot=this.cabinetRunLength/slots;

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

            this.cabinetRunLength/2,

            .965,

            this.wallThickness/2+this.cabinetDepth/2

        );

        this.group.add(cooktop.group);

    }

    buildHood(){

        const hood=new RangeHood();

        hood.group.position.set(

            this.cabinetRunLength/2,

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

        right.group.position.set(this.cabinetRunLength-.425,1.825,z);

        this.group.add(right.group);

    }

    buildRefrigerator(){

        const fridge=new Refrigerator(this.materials);

        fridge.group.position.set(

            this.fridgeZStart+this.fridgeWidth/2,

            0,

            this.wallThickness/2+fridge.depth/2

        );

        this.group.add(fridge.group);

    }

    buildDoor(){

        const door=new Door();

        door.group.position.set(

            this.doorCenterX,

            0,

            this.wallThickness/2+.02

        );

        this.group.add(door.group);

    }

}
