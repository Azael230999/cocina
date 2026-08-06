import * as THREE from "three";

import {BaseCabinet} from "./BaseCabinet.js";
import {WallCabinet} from "./WallCabinet.js";
import {Sink} from "./Sink.js";
import {Faucet} from "./Faucet.js";

export class RightWallRun{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.roomWidth=options.roomWidth??4.95;

        this.roomDepth=options.roomDepth??4.00;

        this.wallThickness=options.wallThickness??.15;

        this.cabinetDepth=.62;

        this.cabinetZStart=options.doorClearance??.20;

        this.cabinetZEnd=3.10;

        this.build();

    }

    build(){

        this.buildCabinets();

        this.buildSink();

        this.buildUpperCabinets();

        this.buildExtraPantry();

    }

    buildCabinets(){

        const slots=4;

        const length=this.cabinetZEnd-this.cabinetZStart;

        const slot=length/slots;

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

            const z=this.cabinetZStart+slot/2+i*slot;

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

        const start=this.cabinetZStart;

        const length=this.cabinetZEnd-this.cabinetZStart-.10;

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

    buildExtraPantry(){

        const shelfDepth=.34;

        const length=this.roomDepth-this.cabinetZEnd-.05;

        const material=this.materials.get("walnut");

        const x=this.roomWidth-this.wallThickness/2-shelfDepth/2;

        const shelfYs=[.35,.70,1.05,1.40,1.75,2.10];

        for(const y of shelfYs){

            const shelf=new THREE.Mesh(

                new THREE.BoxGeometry(shelfDepth,.03,length),

                material

            );

            shelf.position.set(x,y,this.cabinetZEnd+length/2);

            shelf.castShadow=true;

            shelf.receiveShadow=true;

            this.group.add(shelf);

        }

        this.buildExtraPantryDecor(x,length);

    }

    buildExtraPantryDecor(x,length){

        const material=new THREE.MeshPhysicalMaterial({

            color:"#e9e4d6",

            roughness:.3,

            transparent:true,

            opacity:.75

        });

        for(const y of [.40,1.10,1.80]){

            for(let j=0;j<2;j++){

                const jar=new THREE.Mesh(

                    new THREE.BoxGeometry(.08,.16,.08),

                    material

                );

                jar.position.set(

                    x,

                    y+.10,

                    this.cabinetZEnd+.15+j*.35

                );

                this.group.add(jar);

            }

        }

    }

}
