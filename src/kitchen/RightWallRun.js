import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";
import {WallCabinet} from "./WallCabinet.js";
import {Sink} from "./Sink.js";
import {Faucet} from "./Faucet.js";
import {Refrigerator} from "./Refrigerator.js";

export class RightWallRun{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.roomWidth=options.roomWidth??4.95;

        this.runLength=options.runLength??3.10;

        this.wallThickness=options.wallThickness??.15;

        this.cabinetDepth=.62;

        this.build();

    }

    build(){

        this.buildCabinets();

        this.buildSink();

        this.buildUpperCabinets();

        this.buildRefrigerator();

    }

    buildCabinets(){

        const slots=4;

        const slot=this.runLength/slots;

        const x=this.roomWidth-this.wallThickness/2-this.cabinetDepth/2;

        for(let i=0;i<slots;i++){

            const cabinet=new BaseCabinet(

                this.materials,

                {

                    width:slot-.02,

                    depth:this.cabinetDepth,

                    drawers:2

                }

            );

            const z=slot/2+i*slot;

            cabinet.group.position.set(x,0,z);

            cabinet.group.rotation.y=-Math.PI/2;

            this.group.add(cabinet.group);

        }

    }

    buildSink(){

        const x=this.roomWidth-this.wallThickness/2-this.cabinetDepth/2;

        const sink=new Sink(this.materials);

        sink.group.position.set(x,.93,2.0);

        sink.group.rotation.y=-Math.PI/2;

        this.group.add(sink.group);

        const faucet=new Faucet();

        faucet.group.position.set(x+.12,.93,2.0);

        faucet.group.rotation.y=-Math.PI/2;

        this.group.add(faucet.group);

    }

    buildUpperCabinets(){

        const slots=4;

        const start=.10;

        const length=this.runLength-.20;

        const slot=length/slots;

        const x=this.roomWidth-this.wallThickness/2-.175;

        for(let i=0;i<slots;i++){

            const cabinet=new WallCabinet(

                this.materials,

                {

                    width:slot-.02,

                    height:.6

                }

            );

            const z=start+slot/2+i*slot;

            cabinet.group.position.set(x,1.80,z);

            cabinet.group.rotation.y=-Math.PI/2;

            this.group.add(cabinet.group);

        }

    }

    buildRefrigerator(){

        const fridge=new Refrigerator(this.materials);

        const x=this.roomWidth-this.wallThickness/2-fridge.depth/2;

        fridge.group.position.set(x,0,this.runLength+.40);

        fridge.group.rotation.y=-Math.PI/2;

        this.group.add(fridge.group);

    }

}
