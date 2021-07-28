
import React, { Component } from "react"
import { PerspectiveCamera, WebGLRenderer } from "three";

import { OrbitControls } from '@three-ts/orbit-controls';
import { SCENE_MANAGER } from 'forkengine-core/src/SceneManager';
import useResizeAware from 'react-resize-aware';

export default class SceneView extends Component {
    private shape = {width: window.innerWidth, height: window.innerHeight}
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;
    private containerRef = React.createRef<HTMLDivElement>();
    private doRender = true;
    private orbitControls!: OrbitControls;

    getShape() {
        return this.shape
    }

    componentDidMount() {
        this.doRender = true;

        // Grab intial panel size
        const initRect = this.getShape();

        // set camera to correct size
        this.camera = new PerspectiveCamera(75, initRect.width / initRect.height, 0.1, 1000);

        // assign starting position for camera
        this.camera.position.z = 2;
        this.camera.position.y = .5;

        // Create a new renderer for this scene
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(initRect.width, initRect.height);

        // Add renderer to dom
        this.containerRef.current?.appendChild(this.renderer.domElement)

        // Setup controls
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
        this.orbitControls.enablePan = true;
        this.orbitControls.enableZoom = true;
        this.orbitControls.enableRotate = true;

        this.orbitControls.update();
        // Call first renderer update
        this.updateSceneRender();

        // Invoked when panel size changes
        // TODO:Replace by window or parent related reize
        // this.props.node.setEventListener("resize", (resizeData: {rect: Rect}) => {
        //     const newShape = resizeData.rect;
        //     this.camera.aspect = newShape.width / newShape.height;
        //     this.camera.updateProjectionMatrix();
        //     this.renderer.setSize(newShape.width, newShape.height);
        //     this.renderUpdate();
        // })
    }

    componentWillUnmount() {
        this.doRender = false;
    }

    /**
     * Updates three js renderer
     */
    private updateSceneRender() {
        // Break render loop if stopped rendering
        if(!this.doRender) return;
        requestAnimationFrame( () => this.updateSceneRender() );
        this.orbitControls.update();
        this.renderUpdate();
    }

    private renderUpdate() {
        this.renderer.render(SCENE_MANAGER.getActiveScene(), this.camera)
    }

    private resize(shape: {width: number, height: number}) {
        if(!this.camera) return;
        this.shape = shape;
        const newShape = this.getShape();
        this.camera.aspect = newShape.width / newShape.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(newShape.width, newShape.height);
        this.renderUpdate();
    }

    render() {

        return <RenderWindow
            containerRef={this.containerRef}
            getShape={()=> this.getShape()}
            resize={(shape)=> this.resize(shape)}
        />
    }
}

function RenderWindow(props: {
    getShape(): {width: number, height: number},
    resize(shape: {width: number, height: number}): any,
    containerRef: React.RefObject<HTMLDivElement>
}) {
    const [resizeListener, sizes] = useResizeAware();
    React.useEffect(() => {
        console.log("resize")
        props.resize({
            height: sizes.height || props.getShape().height,
            width: sizes.width || props.getShape().width
        });
        }, [sizes.width, sizes.height]);

    return <div ref={props.containerRef}>
        {resizeListener}
    </div>
}