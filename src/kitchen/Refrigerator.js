import * as THREE from "three";

export class Refrigerator{

    constructor(materials){

        this.group=new THREE.Group();

        this.width=.75;

        this.depth=.70;

        this.height=1.80;

        this.materials=materials;

        this.build();

    }

    build(){

        this.buildBody();

        this.buildDoors();

        this.buildHandles();

    }

    buildBody(){

        const mesh=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                this.height,

                this.depth

            ),

            this.materials.get("blackMetal")

        );

        mesh.position.y=this.height/2;

        mesh.castShadow=true;

        mesh.receiveShadow=true;

        this.group.add(mesh);

    }

    buildDoors(){

        const freezerHeight=this.height*.32;

        const fridgeHeight=this.height-freezerHeight-.02;

        const freezer=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width-.03,

                freezerHeight-.01,

                .02

            ),

            this.materials.get("blackMetal")

        );

        freezer.position.set(

            0,

            this.height-freezerHeight/2,

            this.depth/2+.011

        );

        this.group.add(freezer);

        const door=new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width-.03,

                fridgeHeight-.01,

                .02

            ),

            this.materials.get("blackMetal")

        );

        door.position.set(

            0,

            fridgeHeight/2,

            this.depth/2+.011

        );

        this.group.add(door);

    }

    buildHandles(){

        const handleMaterial=new THREE.MeshPhysicalMaterial({

            color:"#cfcfcf",

            metalness:1,

            roughness:.2

        });

        const freezerHeight=this.height*.32;

        const fridgeHeight=this.height-freezerHeight-.02;

        const freezerHandle=new THREE.Mesh(

            new THREE.BoxGeometry(

                .02,

                freezerHeight-.15,

                .02

            ),

            handleMaterial

        );

        freezerHandle.position.set(

            this.width/2-.06,

            this.height-freezerHeight/2,

            this.depth/2+.03

        );

        this.group.add(freezerHandle);

        const fridgeHandle=new THREE.Mesh(

            new THREE.BoxGeometry(

                .02,

                fridgeHeight-.3,

                .02

            ),

            handleMaterial

        );

        fridgeHandle.position.set(

            this.width/2-.06,

            fridgeHeight/2,

            this.depth/2+.03

        );

        this.group.add(fridgeHandle);

    }

}
