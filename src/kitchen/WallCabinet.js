import * as THREE from "three";

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

    }

    buildBody(){

        const mesh=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                this.height,

                this.depth

            ),

            this.materials.get("whiteOak")

        );

        mesh.castShadow=true;

        mesh.receiveShadow=true;

        this.group.add(mesh);

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

}
