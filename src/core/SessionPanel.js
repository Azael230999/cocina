export class SessionPanel{

    constructor(persistence,sceneManager){

        this.persistence=persistence;

        this.sceneManager=sceneManager;

        this.container=document.getElementById("session-toolbar");

        this.build();

    }

    build(){

        const saveBtn=document.createElement("button");

        saveBtn.textContent="Guardar";

        saveBtn.addEventListener("click",()=>{

            this.persistence.save();

            const original=saveBtn.textContent;

            saveBtn.textContent="Guardado";

            setTimeout(()=>{

                saveBtn.textContent=original;

            },1500);

        });

        this.container.appendChild(saveBtn);

        const exportBtn=document.createElement("button");

        exportBtn.textContent="Exportar imagen";

        exportBtn.addEventListener("click",()=>this.exportImage());

        this.container.appendChild(exportBtn);

    }

    exportImage(){

        const dataUrl=this.sceneManager.renderer.domElement.toDataURL("image/png");

        const link=document.createElement("a");

        link.href=dataUrl;

        link.download="cocina.png";

        link.click();

    }

}
