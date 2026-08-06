import {BarStool} from "../kitchen/BarStool.js";
import {Plant} from "../kitchen/Plant.js";
import {FruitBowl} from "../kitchen/FruitBowl.js";

export class CatalogPanel{

    constructor(materials,editor){

        this.materials=materials;

        this.editor=editor;

        this.container=document.getElementById("catalog-panel");

        this.items=[

            {label:"Banco de bar",factory:()=>new BarStool(this.materials)},

            {label:"Planta",factory:()=>new Plant()},

            {label:"Frutero",factory:()=>new FruitBowl(this.materials)}

        ];

        this.build();

    }

    build(){

        for(const item of this.items){

            const button=document.createElement("button");

            button.textContent=`+ ${item.label}`;

            button.addEventListener("click",()=>{

                this.editor.armPlacement(item.factory,item.label);

            });

            this.container.appendChild(button);

        }

    }

}
