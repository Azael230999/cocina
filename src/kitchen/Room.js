import * as THREE from "three";

export class Room{

    constructor(){

        this.group = new THREE.Group();

        this.width = 4.95;
        this.depth = 4.00;
        this.height = 2.40;

        this.buildFloor();

        this.buildWalls();

    }

    buildFloor(){

        const mesh = new THREE.Mesh(

            new THREE.PlaneGeometry(

                this.width,

                this.depth

            ),

            new THREE.MeshStandardMaterial({

                color:"#ddd4c5",

                roughness:.95

            })

        );

        mesh.rotation.x = -Math.PI/2;

        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

    buildWalls(){

        const material = new THREE.MeshStandardMaterial({

            color:"#f7f4ef"

        });

        const t = .15;

        const h = this.height;

        const north = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                h,

                t

            ),

            material

        );

        north.position.set(

            0,

            h/2,

            -this.depth/2

        );

        north.castShadow = true;

        north.receiveShadow = true;

        this.group.add(north);

        const south = north.clone();

        south.position.z = this.depth/2;

        this.group.add(south);

        const west = new THREE.Mesh(

            new THREE.BoxGeometry(

                t,

                h,

                this.depth

            ),

            material

        );

        west.position.set(

            -this.width/2,

            h/2,

            0

        );

        this.group.add(west);

        const east = west.clone();

        east.position.x = this.width/2;

        this.group.add(east);

    }

}
