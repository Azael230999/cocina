import * as THREE from "three";

export class SpiceRack{

    constructor(materials){

        this.group=new THREE.Group();

        this.materials=materials;

        this.build();

    }

    build(){

        const tray=new THREE.Mesh(

            new THREE.BoxGeometry(.32,.02,.12),

            this.materials.get("walnut")

        );

        tray.position.y=.01;

        tray.castShadow=true;

        this.group.add(tray);

        const jarColors=["#c94f3d","#e0a53b","#8a9a7e","#c9c23f","#a7623f"];

        for(let i=0;i<5;i++){

            const jar=new THREE.Mesh(

                new THREE.CylinderGeometry(.022,.022,.09,12),

                new THREE.MeshPhysicalMaterial({

                    color:"#eef3f2",

                    transparent:true,

                    opacity:.55,

                    roughness:.1

                })

            );

            jar.position.set(-.12+i*.06,.065,0);

            jar.castShadow=true;

            this.group.add(jar);

            const lid=new THREE.Mesh(

                new THREE.CylinderGeometry(.024,.024,.015,12),

                new THREE.MeshStandardMaterial({color:jarColors[i]})

            );

            lid.position.set(-.12+i*.06,.115,0);

            this.group.add(lid);

        }

        this.group.userData.selectable=true;

        this.group.userData.movable=true;

        this.group.userData.kind="prop";

        this.group.userData.label="Especiero";

    }

}
