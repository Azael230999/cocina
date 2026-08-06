import {MATERIAL_PALETTES} from "./MaterialManager.js";

export class MaterialPanel{

    constructor(materials){

        this.materials=materials;

        this.container=document.getElementById("material-panel");

        this.build();

    }

    build(){

        for(const category of MATERIAL_PALETTES){

            const section=document.createElement("div");

            section.className="material-category";

            const title=document.createElement("h3");

            title.textContent=category.label;

            section.appendChild(title);

            const row=document.createElement("div");

            row.className="swatch-row";

            category.swatches.forEach((swatch,index)=>{

                const button=document.createElement("button");

                button.className="swatch";

                if(index===0){

                    button.classList.add("active");

                }

                button.style.background=swatch.hex;

                button.title=swatch.label;

                button.addEventListener("click",()=>{

                    this.materials.setColor(category.role,swatch.hex);

                    row.querySelectorAll(".swatch").forEach(s=>s.classList.remove("active"));

                    button.classList.add("active");

                });

                row.appendChild(button);

            });

            section.appendChild(row);

            this.container.appendChild(section);

        }

    }

}
