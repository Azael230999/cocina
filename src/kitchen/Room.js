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

        this.buildNorthWall();

        this.buildSouthWall();

        this.buildEastWall();

        this.buildWestWall();

        this.buildBaseboards();

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

        this.ceiling.position.y = this.height;

        this.ceiling.receiveShadow = true;

        this.group.add(this.ceiling);

    }

    buildNorthWall(){

        this.northWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                this.height,

                this.wallThickness

            ),

            this.wallMaterial()

        );

        this.northWall.position.set(

            0,

            this.height/2,

            -this.depth/2

        );

        this.northWall.castShadow = true;

        this.northWall.receiveShadow = true;

        this.group.add(this.northWall);

    }

    buildSouthWall(){

        this.southWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                this.height,

                this.wallThickness

            ),

            this.wallMaterial()

        );

        this.southWall.position.set(

            0,

            this.height/2,

            this.depth/2

        );

        this.southWall.castShadow = true;

        this.southWall.receiveShadow = true;

        this.group.add(this.southWall);

    }

    buildEastWall(){

        this.eastWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.wallThickness,

                this.height,

                this.depth

            ),

            this.wallMaterial()

        );

        this.eastWall.position.set(

            this.width/2,

            this.height/2,

            0

        );

        this.eastWall.castShadow = true;

        this.eastWall.receiveShadow = true;

        this.group.add(this.eastWall);

    }

    buildWestWall(){

        this.westWall = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.wallThickness,

                this.height,

                this.depth

            ),

            this.wallMaterial()

        );

        this.westWall.position.set(

            -this.width/2,

            this.height/2,

            0

        );

        this.westWall.castShadow = true;

        this.westWall.receiveShadow = true;

        this.group.add(this.westWall);

    }

    buildBaseboards(){

        const h = .08;

        const p = .02;

        const material = this.materials.get("graphite");

        const north = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.width,

                h,

                this.wallThickness+p

            ),

            material

        );

        north.position.set(

            0,

            h/2,

            -this.depth/2

        );

        this.group.add(north);

        const south = north.clone();

        south.position.z = this.depth/2;

        this.group.add(south);

        const west = new THREE.Mesh(

            new THREE.BoxGeometry(

                this.wallThickness+p,

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

    wallMaterial(){

        if(!this._wallMaterial){

            this._wallMaterial = new THREE.MeshStandardMaterial({

                color:"#f7f4ef"

            });

        }

        return this._wallMaterial;

    }

}
