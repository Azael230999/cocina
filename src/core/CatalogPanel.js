import {BarStool} from "../kitchen/BarStool.js";
import {Plant} from "../kitchen/Plant.js";
import {FruitBowl} from "../kitchen/FruitBowl.js";
import {Chair} from "../kitchen/Chair.js";
import {SpiceRack} from "../kitchen/SpiceRack.js";
import {Microwave} from "../kitchen/Microwave.js";
import {CoffeeMaker} from "../kitchen/CoffeeMaker.js";
import {Vase} from "../kitchen/Vase.js";
import {Shelf} from "../kitchen/Shelf.js";

export class CatalogPanel{

    constructor(materials,editor){

        this.materials=materials;

        this.editor=editor;

        this.container=document.getElementById("catalog-panel");

        this.items=[

            {label:"Banco de bar",factory:()=>new BarStool(this.materials)},

            {label:"Silla",factory:()=>new Chair(this.materials)},

            {label:"Planta",factory:()=>new Plant()},

            {label:"Frutero",factory:()=>new FruitBowl(this.materials)},

            {label:"Florero",factory:()=>new Vase()},

            {label:"Especiero",factory:()=>new SpiceRack(this.materials)},

            {label:"Microondas",factory:()=>new Microwave()},

            {label:"Cafetera",factory:()=>new CoffeeMaker()},

            {label:"Repisa",factory:()=>new Shelf(this.materials)}

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
