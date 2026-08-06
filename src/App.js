import {SceneManager} from "./core/SceneManager.js";
import {Room} from "./kitchen/Room.js";
import {Island} from "./kitchen/Island.js";
import {MaterialManager} from "./core/MaterialManager.js";

export class App{

    constructor(){

        const viewport=document.getElementById("viewport");

        this.scene=new SceneManager(viewport);

        const materials=new MaterialManager();

        const room=new Room();

        this.scene.add(room.group);

        const island=new Island(materials);

        island.group.position.set(0,0,0);

        this.scene.add(island.group);

    }

}
