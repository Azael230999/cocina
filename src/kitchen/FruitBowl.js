import * as THREE from "three";

export class FruitBowl{

    constructor(materials){

        this.group=new THREE.Group();

        this.materials=materials;

        this.build();

    }

    build(){

        const bowl=new THREE.Mesh(

            new THREE.SphereGeometry(.14,24,16,0,Math.PI*2,0,Math.PI/2.2),

            this.materials.get("calacatta")

        );

        bowl.position.y=.06;

        bowl.castShadow=true;

        this.group.add(bowl);

        const fruitColors=["#c94f3d","#e0a53b","#c9c23f","#c94f3d"];

        const fruitPositions=[

            [.04,.14,.02],

            [-.05,.145,.04],

            [.01,.15,-.05],

            [-.04,.155,-.02]

        ];

        fruitPositions.forEach((pos,i)=>{

            const fruit=new THREE.Mesh(

                new THREE.SphereGeometry(.035,12,10),

                new THREE.MeshStandardMaterial({

                    color:fruitColors[i],

                    roughness:.4

                })

            );

            fruit.position.set(pos[0],pos[1],pos[2]);

            fruit.castShadow=true;

            this.group.add(fruit);

        });

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Frutero";

    }

}
