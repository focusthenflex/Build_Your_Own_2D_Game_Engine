"use strict";

import * as vertexBuffer from "./src/engine/vertex_buffer.js";
import * as simpleShader from "./src/engine/shader_support.js";

let mGL = null;

function getGL() {
  return mGL;
}

function initWebGL(htmlCanvasID) {
  let canvas = document.getElementById(htmlCanvasID);

  mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

  if (mGL === null) {
    document.write("<br><b>WebGL 2 is not supported!</b>");
    return;
  }

  mGL.clearColor(0.0, 0.8, 0.0, 1.0);

  vertexBuffer.init();
  simpleShader.init("VertexShader", "FragmentShader");
}

function clearCanvas() {
  mGL.clear(mGL.COLOR_BUFFER_BIT);
}

window.onload = function () {
  initWebGL("GLCanvas");
  clearCanvas();
  drawSquare();
};

function drawSquare() {
  // Step A: Activate the shader
  simpleShader.activate();

  // Step B: Draw with the above settings
  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

export { getGL };
