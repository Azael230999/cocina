import * as THREE from "three";

export class Carcass{

    constructor(material,width,height,depth,thickness=.02){

        this.group=new THREE.Group();

        this.width=width;

        this.height=height;

        this.depth=depth;

        this.thickness=thickness;

        this.build(material);

    }

    build(material){

        const t=this.thickness;

        const left=new THREE.Mesh(

            new THREE.BoxGeometry(t,this.height,this.depth),

            material

        );

        left.name="panelLeft";

        left.position.set(-this.width/2+t/2,this.height/2,0);

        left.castShadow=true;

        left.receiveShadow=true;

        this.group.add(left);

        const right=left.clone();

        right.name="panelRight";

        right.position.x=this.width/2-t/2;

        this.group.add(right);

        const top=new THREE.Mesh(

            new THREE.BoxGeometry(this.width-2*t,t,this.depth),

            material

        );

        top.name="panelTop";

        top.position.set(0,this.height-t/2,0);

        top.castShadow=true;

        top.receiveShadow=true;

        this.group.add(top);

        const bottom=top.clone();

        bottom.name="panelBottom";

        bottom.position.y=t/2;

        this.group.add(bottom);

        const back=new THREE.Mesh(

            new THREE.BoxGeometry(this.width-2*t,this.height-2*t,t),

            material

        );

        back.name="panelBack";

        back.position.set(0,this.height/2,-this.depth/2+t/2);

        back.castShadow=true;

        back.receiveShadow=true;

        this.group.add(back);

    }

}
