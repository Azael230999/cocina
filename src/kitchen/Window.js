import * as THREE from "three";

export class Window{

    constructor(width=1.80,height=1.20){

        this.group = new THREE.Group();

        const frameMaterial =
            new THREE.MeshStandardMaterial({

                color:"#2f2f2f"

            });

        const glassMaterial =
            new THREE.MeshPhysicalMaterial({

                color:"#dff4ff",

                transparent:true,

                transmission:1,

                roughness:0,

                thickness:.01

            });

        const frame =
            new THREE.Mesh(

                new THREE.BoxGeometry(

                    width,

                    height,

                    .05

                ),

                frameMaterial

            );

        const glass =
            new THREE.Mesh(

                new THREE.BoxGeometry(

                    width-.08,

                    height-.08,

                    .01

                ),

                glassMaterial

            );

        glass.position.z=.03;

        this.group.add(frame);

        this.group.add(glass);

        this.group.userData.selectable=true;

        this.group.userData.kind="fixture";

        this.group.userData.label="Ventana";

    }

}
