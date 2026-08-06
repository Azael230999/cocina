import * as THREE from "three";

export class BaseCabinet{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.width=options.width??0.60;

        this.depth=options.depth??0.60;

        this.height=options.height??0.90;

        this.materials=materials;

        this.drawers=options.drawers??3;

        this.build();

    }

    build(){

        this.buildBody();

        this.buildCounter();

        this.buildToeKick();

        this.buildDrawers();

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

        mesh.position.y=this.height/2;

        mesh.castShadow=true;

        mesh.receiveShadow=true;

        this.group.add(mesh);

    }

    buildCounter(){

        const top=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width+.04,

                .03,

                this.depth+.04

            ),

            this.materials.get("calacatta")

        );

        top.position.y=this.height+.015;

        top.castShadow=true;

        this.group.add(top);

    }

    buildToeKick(){

        const toe=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                .10,

                .55

            ),

            this.materials.get("graphite")

        );

        toe.position.y=.05;

        this.group.add(toe);

    }

    buildDrawers(){

        const h=(this.height-.18)/this.drawers;

        for(let i=0;i<this.drawers;i++){

            const front=new THREE.Mesh(

                new THREE.BoxGeometry(

                    this.width-.03,

                    h-.02,

                    .02

                ),

                this.materials.get("whiteOak")

            );

            front.position.set(

                0,

                .12+h/2+i*h,

                this.depth/2+.011

            );

            this.group.add(front);

        }

    }

}
