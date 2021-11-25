import {AmbientLightComponent, HemisphereLightComponent, PointLightComponent } from "forkengine-core/src/components/LightComponent";
import { MeshComponent } from "forkengine-core/src/components/MeshComponent";
import { TestComponent } from "forkengine-core/src/components/TestComponent";
import { GameObject } from "forkengine-core/src/GameObject";
import { ISceneController } from "forkengine-core/src/SceneController";
import { SceneManager } from "forkengine-core/src/SceneManager";
import {BoxGeometry, Camera, MeshStandardMaterial, PerspectiveCamera} from "three";

export class TestScene implements ISceneController {

    createCamera(): Camera {
        const camera = new PerspectiveCamera(75, 16/9, 0.1, 1000);
        camera.position.z = 2;
        camera.position.y = .5;

        return camera
    }

    initialize(sceneManager: SceneManager) {
        const light = sceneManager.addGameObject(new GameObject())
            .addComponent(new HemisphereLightComponent(0xffffbb, 0x080820, .6))
            .addComponent(new AmbientLightComponent(0xffffff, .3))
            .addComponent(new PointLightComponent(0xffffff, 1))
        light.transform.position.y = 3;

        const box2 = sceneManager.addGameObject(new GameObject())
            .addComponent(new MeshComponent(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({color: 0x00ff00})))
            .addComponent(new TestComponent())
    }

}