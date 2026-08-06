import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

            powerPreference:"high-performance"

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

        this.setView("kitchen");

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

        switch(name){

            case "iso":

                this.camera.position.set(6,5,6);

                break;

            case "top":

                this.camera.position.set(0,10,0.001);

                break;

            case "front":

                this.camera.position.set(0,1.7,7);

                break;

            case "kitchen":

                this.camera.position.set(2.0,1.7,1.6);

                break;

        }

        this.controls.target.set(

            0,

            1,

            0

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
