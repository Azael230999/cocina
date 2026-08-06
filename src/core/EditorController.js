import * as THREE from "three";

export class EditorController{

    constructor(sceneManager,room){

        this.sceneManager=sceneManager;

        this.room=room;

        this.raycaster=new THREE.Raycaster();

        this.pointer=new THREE.Vector2();

        this.selected=null;

        this.highlighted=[];

        this.placementFactory=null;

        this.placementLabel=null;

        this.moveArmed=false;

        this.downPos=null;

        this.panel=document.getElementById("editor-panel");

        this.hint=document.getElementById("placement-hint");

        this.bindEvents();

    }

    bindEvents(){

        const dom=this.sceneManager.renderer.domElement;

        dom.addEventListener("pointerdown",(e)=>{

            this.downPos={x:e.clientX,y:e.clientY};

        });

        dom.addEventListener("pointerup",(e)=>{

            if(!this.downPos){

                return;

            }

            const dx=e.clientX-this.downPos.x;

            const dy=e.clientY-this.downPos.y;

            if(Math.hypot(dx,dy)>5){

                return;

            }

            this.handleClick(e);

        });

        window.addEventListener("keydown",(e)=>{

            if(e.key==="Escape"){

                this.cancelPlacement();

                this.cancelMove();

            }

        });

    }

    updatePointer(e){

        const rect=this.sceneManager.renderer.domElement.getBoundingClientRect();

        this.pointer.x=((e.clientX-rect.left)/rect.width)*2-1;

        this.pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;

    }

    handleClick(e){

        this.updatePointer(e);

        if(this.placementFactory){

            this.tryPlace();

            return;

        }

        if(this.moveArmed){

            this.tryMove();

            return;

        }

        this.raycaster.setFromCamera(this.pointer,this.sceneManager.camera);

        const hits=this.raycaster.intersectObjects(this.sceneManager.scene.children,true);

        for(const hit of hits){

            const target=this.findSelectable(hit.object);

            if(target){

                this.select(target);

                return;

            }

        }

        this.deselect();

    }

    findSelectable(object){

        let current=object;

        while(current){

            if(current.userData&&current.userData.selectable){

                return current;

            }

            current=current.parent;

        }

        return null;

    }

    findSurfaceHit(){

        this.raycaster.setFromCamera(this.pointer,this.sceneManager.camera);

        const hits=this.raycaster.intersectObjects(this.sceneManager.scene.children,true);

        return hits.find(hit=>hit.object.userData&&hit.object.userData.isSurface);

    }

    select(group){

        this.clearHighlight();

        this.selected=group;

        group.traverse(child=>{

            if(child.isMesh&&child.material){

                const original=child.material;

                const clone=original.clone();

                if(clone.emissive){

                    clone.emissive=new THREE.Color("#4a90d9");

                    clone.emissiveIntensity=.6;

                }

                child.material=clone;

                this.highlighted.push({mesh:child,original});

            }

        });

        this.updatePanel();

    }

    clearHighlight(){

        this.highlighted.forEach(({mesh,original})=>{

            mesh.material.dispose();

            mesh.material=original;

        });

        this.highlighted=[];

    }

    deselect(){

        this.clearHighlight();

        this.selected=null;

        this.updatePanel();

    }

    deleteSelected(){

        if(!this.selected){

            return;

        }

        this.clearHighlight();

        if(this.selected.parent){

            this.selected.parent.remove(this.selected);

        }

        this.selected=null;

        this.updatePanel();

    }

    cycleDrawers(){

        if(this.selected&&this.selected.userData.cycleDrawers){

            const newGroup=this.selected.userData.cycleDrawers();

            this.select(newGroup);

        }

    }

    rotateSelected(){

        if(this.selected){

            this.selected.rotation.y+=Math.PI/2;

        }

    }

    armPlacement(factory,label){

        this.deselect();

        this.cancelMove();

        this.placementFactory=factory;

        this.placementLabel=label;

        this.hint.textContent=`Haz clic en el piso o una cubierta para colocar: ${label} (Esc para cancelar)`;

        this.hint.style.display="block";

    }

    cancelPlacement(){

        this.placementFactory=null;

        this.placementLabel=null;

        if(!this.moveArmed){

            this.hint.style.display="none";

        }

    }

    armMove(){

        if(!this.selected){

            return;

        }

        this.cancelPlacement();

        this.moveArmed=true;

        this.hint.textContent=`Haz clic en el piso o una cubierta para mover: ${this.selected.userData.label||"objeto"} (Esc para cancelar)`;

        this.hint.style.display="block";

    }

    cancelMove(){

        this.moveArmed=false;

        if(!this.placementFactory){

            this.hint.style.display="none";

        }

    }

    tryPlace(){

        const hit=this.findSurfaceHit();

        if(hit){

            const instance=this.placementFactory();

            instance.group.position.copy(hit.point);

            this.sceneManager.add(instance.group);

            this.cancelPlacement();

            this.select(instance.group);

        }

    }

    tryMove(){

        const hit=this.findSurfaceHit();

        if(hit&&this.selected){

            this.selected.position.x=hit.point.x;

            this.selected.position.z=hit.point.z;

            this.cancelMove();

            this.updatePanel();

        }

    }

    updatePanel(){

        if(!this.selected){

            this.panel.style.display="none";

            return;

        }

        this.panel.style.display="block";

        this.panel.innerHTML="";

        const title=document.createElement("div");

        title.className="editor-title";

        title.textContent=this.selected.userData.label||"Objeto";

        this.panel.appendChild(title);

        const actions=document.createElement("div");

        actions.className="editor-actions";

        if(this.selected.userData.cycleDrawers){

            const cycleBtn=document.createElement("button");

            cycleBtn.textContent="Cambiar cajones";

            cycleBtn.addEventListener("click",()=>this.cycleDrawers());

            actions.appendChild(cycleBtn);

        }

        if(this.selected.userData.movable){

            const moveBtn=document.createElement("button");

            moveBtn.textContent="Mover";

            moveBtn.addEventListener("click",()=>this.armMove());

            actions.appendChild(moveBtn);

            const rotateBtn=document.createElement("button");

            rotateBtn.textContent="Rotar";

            rotateBtn.addEventListener("click",()=>this.rotateSelected());

            actions.appendChild(rotateBtn);

        }

        const deleteBtn=document.createElement("button");

        deleteBtn.textContent="Eliminar";

        deleteBtn.className="danger";

        deleteBtn.addEventListener("click",()=>this.deleteSelected());

        actions.appendChild(deleteBtn);

        this.panel.appendChild(actions);

    }

}
