import * as THREE from "three";

export class OvenTower{

    constructor(materials){

        this.group=new THREE.Group();

        this.width=.60;

        this.depth=.60;

        this.height=1.80;

        this.materials=materials;

        this.build();

    }

    build(){

        this.buildBody();

        this.buildLowerDrawer();

        this.buildOvenDoor();

        this.buildUpperCabinet();

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

    buildLowerDrawer(){

        const drawer=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width-.06,

                .50,

                .02

            ),

            this.materials.get("whiteOak")

        );

        drawer.position.set(

            0,

            .27,

            this.depth/2+.011

        );

        this.group.add(drawer);

    }

    buildOvenDoor(){

        const door=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width-.06,

                .55,

                .02

            ),

            this.materials.get("graphite")

        );

        door.position.set(

            0,

            .98,

            this.depth/2+.011

        );

        this.group.add(door);

        const glass=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width-.14,

                .41,

                .01

            ),

            new THREE.MeshPhysicalMaterial({

                color:"#111111",

                roughness:.1,

                metalness:.2

            })

        );

        glass.position.set(

            0,

            .98,

            this.depth/2+.022

        );

        this.group.add(glass);

    }

    buildUpperCabinet(){

        const panel=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width-.06,

                .50,

                .02

            ),

            this.materials.get("whiteOak")

        );

        panel.position.set(

            0,

            1.55,

            this.depth/2+.011

        );

        this.group.add(panel);

    }

}
