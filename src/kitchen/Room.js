import * as THREE from "three";

export class Room{

    constructor(materials){

        this.group = new THREE.Group();

        this.materials = materials;

        this.width = 4.95;
        this.depth = 4.00;
        this.height = 2.40;

        this.wallThickness = 0.15;

        this.buildFloor();

        this.buildCeiling();

        this.buildBackWall();

        this.buildLeftWall();

        this.buildRightWall();

        this.buildBaseboards();

    }

    buildFloor(){

        this.floorMesh = new THREE.Mesh(

            new THREE.PlaneGeometry(

                this.width,

                this.depth

            ),

            this.materials.get("floor")

        );

        this.floorMesh.rotation.x = -Math.PI/2;

        this.floorMesh.position.set(this.width/2,0,this.depth/2);

        this.floorMesh.receiveShadow = true;

        this.floorMesh.userData.isSurface = true;

        this.group.add(this.floorMesh);

    }

    buildCeiling(){

        this.ceiling = new THREE.Mesh(

            new THREE.PlaneGeometry(

                this.width,

                this.depth

            ),

            new THREE.MeshStandardMaterial({

                color:"#fbfaf7",

                roughness:.95

            })

        );

        this.ceiling.rotation.x = Math.PI/2;

        this.ceiling.position.set(this.width/2,this.height,this.depth/2);

        this.ceiling.receiveShadow = true;

        this.group.add(this.ceiling);

    }

    buildBackWall(){

        this.backWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                this.height,

                this.wallThickness

            ),

            this.materials.get("wall")

        );

        this.backWall.position.set(

            this.width/2,

            this.height/2,

            0

        );

        this.backWall.castShadow = true;

        this.backWall.receiveShadow = true;

        this.backWall.userData.isSurface = true;

        this.group.add(this.backWall);

    }

    buildLeftWall(){

        this.leftWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.wallThickness,

                this.height,

                this.depth

            ),

            this.materials.get("wall")

        );

        this.leftWall.position.set(

            0,

            this.height/2,

            this.depth/2

        );

        this.leftWall.castShadow = true;

        this.leftWall.receiveShadow = true;

        this.leftWall.userData.isSurface = true;

        this.group.add(this.leftWall);

    }

    buildRightWall(){

        this.rightWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.wallThickness,

                this.height,

                this.depth

            ),

            this.materials.get("wall")

        );

        this.rightWall.position.set(

            this.width,

            this.height/2,

            this.depth/2

        );

        this.rightWall.castShadow = true;

        this.rightWall.receiveShadow = true;

        this.rightWall.userData.isSurface = true;

        this.group.add(this.rightWall);

    }

    buildBaseboards(){

        const h = .08;

        const p = .02;

        const material = this.materials.get("graphite");

        const back = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                h,

                this.wallThickness+p

            ),

            material

        );

        back.position.set(

            this.width/2,

            h/2,

            0

        );

        this.group.add(back);

        const left = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.wallThickness+p,

                h,

                this.depth

            ),

            material

        );

        left.position.set(

            0,

            h/2,

            this.depth/2

        );

        this.group.add(left);

        const right = left.clone();

        right.position.x = this.width;

        this.group.add(right);

    }

}
