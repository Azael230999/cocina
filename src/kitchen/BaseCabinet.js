import * as THREE from "three";

import {Carcass} from "./Carcass.js";
import {Countertop} from "./Countertop.js";
import {DrawerFront} from "./DrawerFront.js";
import {GolaHandle} from "./GolaHandle.js";

export class BaseCabinet{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.width=options.width??0.60;

        this.depth=options.depth??0.60;

        this.height=options.height??0.90;

        this.materials=materials;

        this.drawers=options.drawers??3;

        this.panelThickness=.02;

        this.build();

    }

    build(){

        this.buildCarcass();

        this.buildCountertop();

        this.buildToeKick();

        this.buildDrawerFronts();

        this.buildGolaHandle();

    }

    buildCarcass(){

        const carcass=new Carcass(

            this.materials.get("whiteOak"),

            this.width,

            this.height,

            this.depth,

            this.panelThickness

        );

        carcass.group.name="carcass";

        this.group.add(carcass.group);

    }

    buildCountertop(){

        const countertop=new Countertop(

            this.materials.get("calacatta"),

            this.width+.04,

            this.depth+.04

        );

        countertop.mesh.name="countertop";

        countertop.mesh.position.y=this.height+.015;

        this.group.add(countertop.mesh);

    }

    buildToeKick(){

        const toeKick=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                .10,

                .55

            ),

            this.materials.get("graphite")

        );

        toeKick.name="toeKick";

        toeKick.position.y=.05;

        this.group.add(toeKick);

    }

    buildDrawerFronts(){

        const h=(this.height-.18)/this.drawers;

        for(let i=0;i<this.drawers;i++){

            const drawerFront=new DrawerFront(

                this.materials.get("whiteOak"),

                this.width-.03,

                h-.02

            );

            drawerFront.mesh.name=`drawer0${i+1}`;

            drawerFront.mesh.position.set(

                0,

                .12+h/2+i*h,

                this.depth/2+.011

            );

            this.group.add(drawerFront.mesh);

        }

    }

    buildGolaHandle(){

        const h=(this.height-.18)/this.drawers;

        const topDrawerCenterY=.12+h/2+(this.drawers-1)*h;

        const handle=new GolaHandle(this.width-.08);

        handle.mesh.name="golaHandle";

        handle.mesh.position.set(

            0,

            topDrawerCenterY+h/2-.03,

            this.depth/2+.03

        );

        this.group.add(handle.mesh);

    }

}
