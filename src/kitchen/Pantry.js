import * as THREE from "three";

export class Pantry{

    constructor(materials,options={}){

        this.group=new THREE.Group();

        this.materials=materials;

        const wallX=options.wallX??3.20;

        const wallZ1=options.wallZ1??1.90;

        const wallZ2=options.wallZ2??3.90;

        this.length=wallZ2-wallZ1;

        this.height=options.height??2.40;

        this.thickness=.10;

        this.build();

        this.group.position.set(wallX,0,(wallZ1+wallZ2)/2);

        this.tagEditable();

    }

    tagEditable(){

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="fixture";

        this.group.userData.label="Alacena";

    }

    build(){

        this.buildWall();

        this.buildShelves();

        this.buildDecor();

    }

    buildWall(){

        const wall=new THREE.Mesh(

            new THREE.BoxGeometry(this.thickness,this.height,this.length),

            new THREE.MeshStandardMaterial({

                color:"#b5714a",

                roughness:.85

            })

        );

        wall.position.set(0,this.height/2,0);

        wall.castShadow=true;

        wall.receiveShadow=true;

        this.group.add(wall);

    }

    buildShelves(){

        const shelfDepth=.30;

        const material=this.materials.get("walnut");

        this.shelfYs=[];

        for(let i=0;i<5;i++){

            const y=.35+i*.35;

            this.shelfYs.push(y);

            const shelf=new THREE.Mesh(

                new THREE.BoxGeometry(shelfDepth,.03,this.length-.4),

                material

            );

            shelf.position.set(

                this.thickness/2+shelfDepth/2,

                y,

                0

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

                    this.thickness/2+.15,

                    y+.10,

                    -this.length/2+.6+j*.35

                );

                this.group.add(jar);

            }

        }

    }

}
