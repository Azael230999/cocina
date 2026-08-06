import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export class SceneManager {

    constructor(container){

        this.container = container;

        this.clock = new THREE.Clock();

        this.scene = new THREE.Scene();

        this.scene.background = new THREE.Color(0xf5f2ec);

        this.camera = new THREE.PerspectiveCamera(

            50,

            container.clientWidth/container.clientHeight,

            0.1,

            500

        );

        this.renderer = new THREE.WebGLRenderer({

            antialias:true,

            powerPreference:"high-performance",

            preserveDrawingBuffer:true

        });

        this.renderer.setPixelRatio(

            Math.min(window.devicePixelRatio,2)

        );

        this.renderer.setSize(

            container.clientWidth,

            container.clientHeight

        );

        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure = 1.1;

        this.renderer.shadowMap.enabled = true;

        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(

            this.camera,

            this.renderer.domElement

        );

        this.controls.enableDamping = true;

        this.controls.dampingFactor = .05;

        this.controls.minDistance = 0.5;

        this.controls.maxDistance = 16;

        this.controls.maxPolarAngle = Math.PI/2 - 0.03;

        this.setView("iso");

        this.createEnvironment();

        this.createLights();

        this.createGrid();

        this.animate();

        window.addEventListener(

            "resize",

            ()=>this.resize()

        );

    }

    createEnvironment(){

        this.scene.fog = new THREE.Fog(

            0xf5f2ec,

            18,

            35

        );

        const pmrem = new THREE.PMREMGenerator(this.renderer);

        this.scene.environment = pmrem.fromScene(

            new RoomEnvironment(),

            0.04

        ).texture;

        pmrem.dispose();

    }

    createLights(){

        const hemi = new THREE.HemisphereLight(

            0xffffff,

            0xb5b5b5,

            1.4

        );

        this.scene.add(hemi);

        const sun = new THREE.DirectionalLight(

            0xffffff,

            2.5

        );

        sun.position.set(

            8,

            12,

            6

        );

        sun.castShadow = true;

        sun.shadow.mapSize.width = 4096;

        sun.shadow.mapSize.height = 4096;

        sun.shadow.camera.left = -15;

        sun.shadow.camera.right = 15;

        sun.shadow.camera.top = 15;

        sun.shadow.camera.bottom = -15;

        this.scene.add(sun);

    }

    createGrid(){

        const grid = new THREE.GridHelper(

            20,

            20,

            0x999999,

            0xdddddd

        );

        grid.position.y = .001;

        this.scene.add(grid);

    }

    setView(name){

        const fixed={

            top:{position:[2.475,10,2.0001],target:[2.475,0,2.0]},

            sink:{position:[3.6,1.6,1.5],target:[4.6,1.0,2.0]},

            pantry:{position:[4.0,1.4,3.6],target:[3.9,1.1,2.9]}

        };

        if(fixed[name]){

            const f=fixed[name];

            this.camera.position.set(f.position[0],f.position[1],f.position[2]);

            this.controls.target.set(f.target[0],f.target[1],f.target[2]);

            return;

        }

        const presets={

            iso:{theta:0.9,phi:1.05,radius:9.5,target:[2.475,1.1,2.0]},

            stove:{theta:0.0,phi:1.2,radius:4.5,target:[1.2,1.0,0.3]},

            island:{theta:0.6,phi:1.1,radius:4.2,target:[1.75,0.9,2.4]}

        };

        const p=presets[name]??presets.iso;

        const x=p.target[0]+p.radius*Math.sin(p.phi)*Math.sin(p.theta);

        const y=p.target[1]+p.radius*Math.cos(p.phi);

        const z=p.target[2]+p.radius*Math.sin(p.phi)*Math.cos(p.theta);

        this.camera.position.set(x,y,z);

        this.controls.target.set(

            p.target[0],

            p.target[1],

            p.target[2]

        );

    }

    add(object){

        this.scene.add(object);

    }

    remove(object){

        this.scene.remove(object);

    }

    animate(){

        requestAnimationFrame(

            ()=>this.animate()

        );

        const dt = this.clock.getDelta();

        this.controls.update(dt);

        if(this.camera.position.y<0.05){

            this.camera.position.y=0.05;

        }

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    resize(){

        this.camera.aspect =

        this.container.clientWidth/

        this.container.clientHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            this.container.clientWidth,

            this.container.clientHeight

        );

    }

}
