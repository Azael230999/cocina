import * as THREE from "three";

import {Carcass} from "./Carcass.js";
import {GolaHandle} from "./GolaHandle.js";

export class WallCabinet{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.width=options.width??0.60;

        this.depth=options.depth??0.35;

        this.height=options.height??0.70;

        this.materials=materials;

        this.build();

    }

    build(){

        this.buildBody();

        this.buildDoors();

        this.buildGolaHandle();

    }

    buildBody(){

        const carcass=new Carcass(

            this.materials.get("whiteOak"),

            this.width,

            this.height,

            this.depth,

            .02

        );

        carcass.group.name="carcass";

        carcass.group.position.y=-this.height/2;

        this.group.add(carcass.group);

    }

    buildDoors(){

        const doorWidth=this.width/2-.015;

        for(let i=0;i<2;i++){

            const sign=i===0?-1:1;

            const door=new THREE.Mesh(

                new THREE.BoxGeometry(

                    doorWidth,

                    this.height-.03,

                    .02

                ),

                this.materials.get("whiteOak")

            );

            door.name=i===0?"doorLeft":"doorRight";

            door.position.set(

                sign*(doorWidth/2+.0075),

                0,

                this.depth/2+.011

            );

            this.group.add(door);

        }

    }

    buildGolaHandle(){

        const handle=new GolaHandle(this.width-.08);

        handle.mesh.name="golaHandle";

        handle.mesh.position.set(

            0,

            -this.height/2+.03,

            this.depth/2+.03

        );

        this.group.add(handle.mesh);

    }

}
