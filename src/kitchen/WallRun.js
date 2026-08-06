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

        this.mountBottom=1.45;

        this.build();

    }

    build(){

        this.buildBaseCabinets();

        this.buildWallCabinets();

        this.buildUnderCabinetLighting();

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

                this.mountBottom+cabinet.height/2,

                this.wallZ+cabinet.depth/2

            );

            this.group.add(cabinet.group);

        }

    }

    buildUnderCabinetLighting(){

        const stripMaterial=new THREE.MeshStandardMaterial({

            color:"#fff6df",

            emissive:"#fff6df",

            emissiveIntensity:1.5

        });

        const strip=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.length-.1,

                .015,

                .03

            ),

            stripMaterial

        );

        const stripZ=this.wallZ+.34;

        strip.position.set(

            0,

            this.mountBottom-.02,

            stripZ

        );

        this.group.add(strip);

        const lightPositions=[-this.length/4,this.length/4];

        for(const x of lightPositions){

            const light=new THREE.PointLight(0xfff3d6,3,2.4,2);

            light.position.set(

                x,

                this.mountBottom-.05,

                stripZ

            );

            this.group.add(light);

        }

    }

}
