import React, {useEffect, useRef} from "react";
import "./App.scss"

import { ForkengineWebRenderer, RendererContext } from "forkengine-web-renderer/src/renderer/Renderer";
import {MainCanvas} from "forkengine-web-renderer/src/components/MainCanvas"
import { TestScene } from "./Scene";
import { SceneManager } from "forkengine-core/src/SceneManager";

import { SceneView } from "forkengine-web-renderer/src/components/Scene"


const scene = new TestScene()
const sceneManager = new SceneManager(scene)
sceneManager.initScene()


const App = () => {
    // initialize renderer
    const forkengineCanvasRef = useRef<HTMLCanvasElement>(null)
    const forkengineRenderer = new ForkengineWebRenderer()
    useEffect(() => {
        forkengineRenderer.initialize(forkengineCanvasRef)
    }, [forkengineCanvasRef, forkengineRenderer])


    // renderer context provider is used to pass the renderer instance down to all SceneComponents
    return (
        <RendererContext.Provider value={{renderer: forkengineRenderer}}>
            <MainCanvas canvasRef={forkengineCanvasRef} />
            <div id="app">
                <SceneView sceneManager={sceneManager} />
            </div>
        </RendererContext.Provider>
    );
};

export default App;
