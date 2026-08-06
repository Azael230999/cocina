import * as THREE from "three";

export class Vase{

    constructor(){

        this.group=new THREE.Group();

        this.build();

    }

    build(){

        const body=new THREE.Mesh(

            new THREE.CylinderGeometry(.045,.06,.18,16),

            new THREE.MeshPhysicalMaterial({

                color:"#e9e4d6",

                roughness:.3,

                transparent:true,

                opacity:.8

            })

        );

        body.position.y=.09;

        body.castShadow=true;

        this.group.add(body);

        const stemMaterial=new THREE.MeshStandardMaterial({color:"#4c6b3f"});

        const flowerColors=["#e0a53b","#c94f3d","#c9c23f"];

        const stems=[

            [.01,.02],

            [-.015,-.01],

            [.02,-.02]

        ];

        stems.forEach(([x,z],i)=>{

            const stem=new THREE.Mesh(

                new THREE.CylinderGeometry(.004,.004,.20,6),

                stemMaterial

            );

            stem.position.set(x,.28,z);

            this.group.add(stem);

            const flower=new THREE.Mesh(

                new THREE.SphereGeometry(.025,10,8),

                new THREE.MeshStandardMaterial({color:flowerColors[i]})

            );

            flower.position.set(x,.39,z);

            this.group.add(flower);

        });

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Florero";

    }

}
