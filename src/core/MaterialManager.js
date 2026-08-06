import * as THREE from "three";

export class MaterialManager{

    constructor(){

        this.materials={};

        this.create();

    }

    create(){

        this.materials.whiteOak=new THREE.MeshPhysicalMaterial({

            color:"#D7C3A5",

            roughness:.72,

            metalness:0,

            clearcoat:.05

        });

        this.materials.walnut=new THREE.MeshPhysicalMaterial({

            color:"#7A5A42",

            roughness:.74

        });

        this.materials.graphite=new THREE.MeshPhysicalMaterial({

            color:"#444444",

            roughness:.85

        });

        this.materials.calacatta=new THREE.MeshPhysicalMaterial({

            color:"#F6F5F2",

            roughness:.12,

            clearcoat:1,

            clearcoatRoughness:.03

        });

        this.materials.blackMetal=new THREE.MeshPhysicalMaterial({

            color:"#232323",

            metalness:.95,

            roughness:.35

        });

    }

    get(name){

        return this.materials[name];

    }

}
