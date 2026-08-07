import * as THREE from "three";

export class Shelf{

    constructor(materials){

        this.group=new THREE.Group();

        this.materials=materials;

        this.width=.90;

        this.depth=.22;

        this.mountHeight=1.30;

        this.build();

    }

    build(){

        this.buildPlank();

        this.buildBrackets();

        this.buildDecor();

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Repisa";

    }

    buildPlank(){

        const plank=new THREE.Mesh(

            new THREE.BoxGeometry(this.width,.04,this.depth),

            this.materials.get("whiteOak")

        );

        plank.position.y=this.mountHeight;

        plank.castShadow=true;

        plank.receiveShadow=true;

        this.group.add(plank);

    }

    buildBrackets(){

        const bracketMaterial=this.materials.get("graphite");

        for(const sign of [-1,1]){

            const bracket=new THREE.Mesh(

                new THREE.BoxGeometry(.02,.02,this.depth-.02),

                bracketMaterial

            );

            bracket.position.set(sign*(this.width/2-.08),this.mountHeight-.01,0);

            this.group.add(bracket);

            const support=new THREE.Mesh(

                new THREE.BoxGeometry(.02,.18,.02),

                bracketMaterial

            );

            support.position.set(

                sign*(this.width/2-.08),

                this.mountHeight-.10,

                -this.depth/2+.02

            );

            this.group.add(support);

        }

    }

    buildDecor(){

        const bookColors=["#8a4a3d","#3d5a4a","#4a4a7a"];

        for(let i=0;i<3;i++){

            const book=new THREE.Mesh(

                new THREE.BoxGeometry(.03,.18,.14),

                new THREE.MeshStandardMaterial({color:bookColors[i]})

            );

            book.position.set(

                -this.width/2+.18+i*.035,

                this.mountHeight+.11,

                0

            );

            book.castShadow=true;

            this.group.add(book);

        }

        const jar=new THREE.Mesh(

            new THREE.CylinderGeometry(.05,.05,.12,16),

            new THREE.MeshPhysicalMaterial({

                color:"#eef3f2",

                transparent:true,

                opacity:.55,

                roughness:.1

            })

        );

        jar.position.set(this.width/2-.15,this.mountHeight+.08,0);

        jar.castShadow=true;

        this.group.add(jar);

    }

}
