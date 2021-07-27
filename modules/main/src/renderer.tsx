import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { SCENE_MANAGER } from 'forkengine-core/src/SceneManager';

SCENE_MANAGER.initScene()
ReactDOM.render(<App />, document.getElementById("root"));
