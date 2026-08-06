import * as THREE from "three";

export class Pantry{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        this.wallX=options.wallX??3.20;

        this.wallZ1=options.wallZ1??1.90;

        this.wallZ2=options.wallZ2??3.90;

        this.height=options.height??2.40;

        this.thickness=.10;

        this.build();

    }

    build(){

        this.buildWall();

        this.buildShelves();

        this.buildDecor();

    }

    buildWall(){

        const length=this.wallZ2-this.wallZ1;

        const wall=new THREE.Mesh(

            new THREE.BoxGeometry(this.thickness,this.height,length),

            new THREE.MeshStandardMaterial({

                color:"#b5714a",

                roughness:.85

            })

        );

        wall.position.set(

            this.wallX,

            this.height/2,

            this.wallZ1+length/2

        );

        wall.castShadow=true;

        wall.receiveShadow=true;

        this.group.add(wall);

    }

    buildShelves(){

        const length=this.wallZ2-this.wallZ1;

        const shelfDepth=.30;

        const material=this.materials.get("walnut");

        this.shelfYs=[];

        for(let i=0;i<5;i++){

            const y=.35+i*.35;

            this.shelfYs.push(y);

            const shelf=new THREE.Mesh(

                new THREE.BoxGeometry(shelfDepth,.03,length-.4),

                material

            );

            shelf.position.set(

                this.wallX+this.thickness/2+shelfDepth/2,

                y,

                this.wallZ1+length/2

            );

            shelf.castShadow=true;

            shelf.receiveShadow=true;

            this.group.add(shelf);

        }

    }

    buildDecor(){

        const material=new THREE.MeshPhysicalMaterial({

            color:"#e9e4d6",

            roughness:.3,

            transparent:true,

            opacity:.75

        });

        for(const y of [this.shelfYs[1],this.shelfYs[3]]){

            for(let j=0;j<3;j++){

                const jar=new THREE.Mesh(

                    new THREE.BoxGeometry(.08,.16,.08),

                    material

                );

                jar.position.set(

                    this.wallX+this.thickness/2+.15,

                    y+.10,

                    this.wallZ1+.6+j*.35

                );

                this.group.add(jar);

            }

        }

    }

}
