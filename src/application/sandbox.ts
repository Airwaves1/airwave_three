import { Application } from "./application";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Sandbox extends Application {
    private gltfLoader = new GLTFLoader();
    public sunLight = new THREE.DirectionalLight(0xffffff, 1);
    public controller = new OrbitControls(this.camera, this.renderer.domElement);

    protected override onInit() {
        this.renderer.shadowMap.enabled = true;

        this.camera.position.set(100, 100, 100);
        this.camera.far = 1000;

        this.sunLight.position.set(10, 10, 10);
        this.sunLight.target.position.set(0, 0, 0);
        this.sunLight.castShadow = true;
        this.sunLight.intensity = 5;
        this.scene.add(this.sunLight);

        // this.scene.add(new THREE.AmbientLight(0x404040));


        this.gltfLoader.load('assets/mountain_range_1k.glb', (gltf) => {
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    (child as THREE.Mesh).receiveShadow = true;
                    (child as THREE.Mesh).castShadow = true;
                }
            });
            gltf.scene.position.set(0, 0, 0);
            gltf.scene.scale.set(100, 100, 100);
            this.scene.add(gltf.scene);
        });
        
        this.renderer.setClearColor(0x000000);
    }

    protected override onResize() {
    }

    protected override onRender() {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override onUpdate(delta: number): void {
        this.controller.update();
    }
}