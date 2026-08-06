import {SceneManager} from "./core/SceneManager.js";
import {Room} from "./kitchen/Room.js";
import {Island} from "./kitchen/Island.js";
import {WallRun} from "./kitchen/WallRun.js";
import {Window} from "./kitchen/Window.js";
import {Door} from "./kitchen/Door.js";
import {Sink} from "./kitchen/Sink.js";
import {Faucet} from "./kitchen/Faucet.js";
import {Cooktop} from "./kitchen/Cooktop.js";
import {PendantLight} from "./kitchen/PendantLight.js";
import {Refrigerator} from "./kitchen/Refrigerator.js";
import {OvenTower} from "./kitchen/OvenTower.js";
import {RangeHood} from "./kitchen/RangeHood.js";
import {MaterialManager} from "./core/MaterialManager.js";

export class App{

    constructor(){

        const viewport=document.getElementById("viewport");

        this.scene=new SceneManager(viewport);

        const materials=new MaterialManager();

        this.room=new Room(materials);

        this.scene.add(this.room.group);

        const island=new Island(materials);

        island.group.position.set(0,0,0);

        this.scene.add(island.group);

        const wallRun=new WallRun(materials);

        this.scene.add(wallRun.group);

        const window_=new Window();

        window_.group.position.set(-2.575,1.55,0);

        window_.group.rotation.y=Math.PI/2;

        this.scene.add(window_.group);

        const door=new Door();

        door.group.position.set(-1.7,0,2.095);

        this.scene.add(door.group);

        const sink=new Sink(materials);

        sink.group.position.set(0,0.93,-1.625);

        this.scene.add(sink.group);

        const faucet=new Faucet();

        faucet.group.position.set(0,0.93,-1.83);

        this.scene.add(faucet.group);

        const cooktop=new Cooktop();

        cooktop.group.position.set(0,0.965,0);

        this.scene.add(cooktop.group);

        const pendant=new PendantLight();

        pendant.group.position.set(-0.5,2.4,0.15);

        this.scene.add(pendant.group);

        const fridge=new Refrigerator(materials);

        fridge.group.position.set(2.05,0,0.0);

        fridge.group.rotation.y=-Math.PI/2;

        this.scene.add(fridge.group);

        const ovenTower=new OvenTower(materials);

        ovenTower.group.position.set(2.10,0,0.675);

        ovenTower.group.rotation.y=-Math.PI/2;

        this.scene.add(ovenTower.group);

        const hood=new RangeHood();

        hood.group.position.set(0,1.70,0);

        this.scene.add(hood.group);

        this.bindViewButtons();

    }

    bindViewButtons(){

        const buttons=document.querySelectorAll("[data-view]");

        buttons.forEach(button=>{

            button.addEventListener("click",()=>{

                const view=button.dataset.view;

                this.scene.setView(view);

                this.room.ceiling.visible=view!=="top";

            });

        });

    }

}
