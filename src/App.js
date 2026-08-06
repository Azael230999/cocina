import {SceneManager} from "./core/SceneManager.js";
import {Room} from "./kitchen/Room.js";
import {Island} from "./kitchen/Island.js";
import {BackWallRun} from "./kitchen/BackWallRun.js";
import {RightWallRun} from "./kitchen/RightWallRun.js";
import {Pantry} from "./kitchen/Pantry.js";
import {Window} from "./kitchen/Window.js";
import {MaterialManager} from "./core/MaterialManager.js";
import {MaterialPanel} from "./core/MaterialPanel.js";
import {EditorController} from "./core/EditorController.js";
import {CatalogPanel} from "./core/CatalogPanel.js";

export class App{

    constructor(){

        const viewport=document.getElementById("viewport");

        this.scene=new SceneManager(viewport);

        const materials=new MaterialManager();

        this.room=new Room(materials);

        this.scene.add(this.room.group);

        const island=new Island(materials,{width:1.50,depth:1.50});

        island.group.position.set(1.75,0,2.40);

        this.scene.add(island.group);

        const backWallRun=new BackWallRun(materials);

        this.scene.add(backWallRun.group);

        const rightWallRun=new RightWallRun(materials);

        this.scene.add(rightWallRun.group);

        const pantry=new Pantry(materials);

        this.scene.add(pantry.group);

        const window_=new Window(2.50,1.30);

        window_.group.position.set(-0.10,1.65,2.0);

        window_.group.rotation.y=Math.PI/2;

        this.scene.add(window_.group);

        this.bindViewButtons();

        this.materialPanel=new MaterialPanel(materials);

        this.editor=new EditorController(this.scene,this.room);

        this.catalog=new CatalogPanel(materials,this.editor);

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
