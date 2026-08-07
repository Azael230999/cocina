import {BarStool} from "../kitchen/BarStool.js";
import {Chair} from "../kitchen/Chair.js";
import {Plant} from "../kitchen/Plant.js";
import {FruitBowl} from "../kitchen/FruitBowl.js";
import {Vase} from "../kitchen/Vase.js";
import {SpiceRack} from "../kitchen/SpiceRack.js";
import {Microwave} from "../kitchen/Microwave.js";
import {CoffeeMaker} from "../kitchen/CoffeeMaker.js";
import {Shelf} from "../kitchen/Shelf.js";

const FACTORIES={

    "Banco de bar":(materials)=>new BarStool(materials),

    "Silla":(materials)=>new Chair(materials),

    "Planta":()=>new Plant(),

    "Frutero":(materials)=>new FruitBowl(materials),

    "Florero":()=>new Vase(),

    "Especiero":(materials)=>new SpiceRack(materials),

    "Microondas":()=>new Microwave(),

    "Cafetera":()=>new CoffeeMaker(),

    "Repisa":(materials)=>new Shelf(materials)

};

const MATERIAL_ROLES=["whiteOak","calacatta","floor","wall","graphite"];

const STORAGE_KEY="cocina-config-v1";

export class PersistenceManager{

    constructor(materials,sceneManager,editor){

        this.materials=materials;

        this.sceneManager=sceneManager;

        this.editor=editor;

    }

    save(){

        const state={

            materials:{},

            props:[]

        };

        for(const role of MATERIAL_ROLES){

            const material=this.materials.get(role);

            if(material){

                state.materials[role]=`#${material.color.getHexString()}`;

            }

        }

        for(const {type,group} of this.editor.placedProps){

            state.props.push({

                type,

                position:group.position.toArray(),

                rotationY:group.rotation.y

            });

        }

        localStorage.setItem(STORAGE_KEY,JSON.stringify(state));

    }

    load(){

        const raw=localStorage.getItem(STORAGE_KEY);

        if(!raw){

            return;

        }

        let state;

        try{

            state=JSON.parse(raw);

        }catch(error){

            return;

        }

        if(state.materials){

            for(const role in state.materials){

                this.materials.setColor(role,state.materials[role]);

            }

        }

        if(Array.isArray(state.props)){

            for(const item of state.props){

                const factory=FACTORIES[item.type];

                if(!factory){

                    continue;

                }

                const instance=factory(this.materials);

                instance.group.position.fromArray(item.position);

                instance.group.rotation.y=item.rotationY||0;

                this.sceneManager.add(instance.group);

                this.editor.registerPlaced(item.type,instance.group);

            }

        }

    }

}
