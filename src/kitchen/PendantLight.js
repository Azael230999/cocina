import * as THREE from "three";

export class PendantLight{

    constructor(){

        this.group=new THREE.Group();

        const cordMaterial=new THREE.MeshStandardMaterial({

            color:"#232323"

        });

        const cord=new THREE.Mesh(

            new THREE.CylinderGeometry(.006,.006,.9,8),

            cordMaterial

        );

        cord.position.y=-.45;

        this.group.add(cord);

        const shadeMaterial=new THREE.MeshStandardMaterial({

            color:"#2f2f2f",

            metalness:.6,

            roughness:.35

        });

        const shade=new THREE.Mesh(

            new THREE.CylinderGeometry(.09,.17,.16,32,1,true),

            shadeMaterial

        );

        shade.position.y=-.9;

        shade.castShadow=true;

        this.group.add(shade);

        const bulbMaterial=new THREE.MeshStandardMaterial({

            color:"#fff3d6",

            emissive:"#fff3d6",

            emissiveIntensity:2

        });

        const bulb=new THREE.Mesh(

            new THREE.SphereGeometry(.035,16,16),

            bulbMaterial

        );

        bulb.position.y=-.96;

        this.group.add(bulb);

        this.light=new THREE.PointLight(0xfff0d0,6,4,2);

        this.light.position.y=-.96;

        this.light.castShadow=true;

        this.group.add(this.light);

    }

}
