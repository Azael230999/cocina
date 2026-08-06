import * as THREE from "three";

function createGrainTexture(){

    const size=512;

    const canvas=document.createElement("canvas");

    canvas.width=size;

    canvas.height=size;

    const ctx=canvas.getContext("2d");

    ctx.fillStyle="#808080";

    ctx.fillRect(0,0,size,size);

    for(let y=0;y<size;y+=2){

        const wobble=Math.sin(y*0.04)*6;

        const shade=170+Math.random()*70;

        ctx.strokeStyle=`rgba(${shade},${shade},${shade},${0.06+Math.random()*0.1})`;

        ctx.beginPath();

        ctx.moveTo(0,y+wobble);

        for(let x=0;x<size;x+=16){

            ctx.lineTo(x,y+wobble+(Math.random()-0.5)*3);

        }

        ctx.stroke();

    }

    const texture=new THREE.CanvasTexture(canvas);

    texture.wrapS=THREE.RepeatWrapping;

    texture.wrapT=THREE.RepeatWrapping;

    return texture;

}

export class MaterialManager{

    constructor(){

        this.materials={};

        this.create();

    }

    create(){

        const grain=createGrainTexture();

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

        grain.repeat.set(5,4);

        this.materials.floor=new THREE.MeshStandardMaterial({

            color:"#ddd4c5",

            roughness:.85,

            roughnessMap:grain,

            bumpMap:grain,

            bumpScale:.0015

        });

        this.materials.wall=new THREE.MeshStandardMaterial({

            color:"#f7f4ef",

            roughness:.95

        });

    }

    get(name){

        return this.materials[name];

    }

    setColor(name,hex){

        const material=this.materials[name];

        if(material){

            material.color.set(hex);

        }

    }

    register(config){

        const material=new THREE.MeshPhysicalMaterial({

            roughness:.7

        });

        material.name=config.name??config.id;

        if(config.baseColor||config.normal||config.roughness||config.ao){

            const loader=new THREE.TextureLoader();

            if(config.baseColor){

                material.map=loader.load(config.baseColor);

                material.map.colorSpace=THREE.SRGBColorSpace;

            }

            if(config.normal){

                material.normalMap=loader.load(config.normal);

            }

            if(config.roughness){

                material.roughnessMap=loader.load(config.roughness);

            }

            if(config.ao){

                material.aoMap=loader.load(config.ao);

            }

        }

        this.materials[config.id]=material;

        return material;

    }

}

export const MATERIAL_PALETTES=[

    {

        role:"whiteOak",

        label:"Gabinetes",

        swatches:[

            {label:"Roble claro",hex:"#D7C3A5"},

            {label:"Nogal",hex:"#7A5A42"},

            {label:"Grafito",hex:"#3f3f3f"},

            {label:"Blanco",hex:"#efece6"},

            {label:"Verde salvia",hex:"#7c8a72"}

        ]

    },

    {

        role:"calacatta",

        label:"Cubiertas",

        swatches:[

            {label:"Calacatta",hex:"#F6F5F2"},

            {label:"Negro granito",hex:"#232323"},

            {label:"Beige cuarzo",hex:"#d8c9ab"},

            {label:"Gris concreto",hex:"#8c8c88"}

        ]

    },

    {

        role:"floor",

        label:"Piso",

        swatches:[

            {label:"Roble claro",hex:"#ddd4c5"},

            {label:"Nogal oscuro",hex:"#8a6a48"},

            {label:"Ceniza",hex:"#c9c4ba"},

            {label:"Porcelanato gris",hex:"#a9a9a4"}

        ]

    },

    {

        role:"wall",

        label:"Pared",

        swatches:[

            {label:"Hueso",hex:"#f7f4ef"},

            {label:"Blanco",hex:"#ffffff"},

            {label:"Verde salvia",hex:"#c9d0bf"},

            {label:"Terracota suave",hex:"#e3c9b6"}

        ]

    },

    {

        role:"graphite",

        label:"Herrajes",

        swatches:[

            {label:"Grafito",hex:"#444444"},

            {label:"Negro mate",hex:"#181818"},

            {label:"Bronce",hex:"#5c4a34"},

            {label:"Acero",hex:"#8a8f94"}

        ]

    }

];
