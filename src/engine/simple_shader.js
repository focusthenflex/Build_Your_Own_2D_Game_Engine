import * as core from "./core.js";
import * as vertexBuffer from "./vertex_buffer.js";

class SimpleShader {
  constructor(vertexShaderId, fragmentShaderID) {
    // instance variables
    // Convention: all instace variables: mVariables

    this.mCompiledShader = null;
    this.mVertexPositionRef = null;

    let gl = core.getGL();

    // Step A: load and compile vertex and fragment shaders
    this.mVertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    this.mFragmentShader = loadAndCompileShader(
      fragmentShaderID,
      gl.FRAGMENT_SHADER
    );

    // Step B: Create and link the shaders into a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, this.mVertexShader);
    gl.attachShader(this.mCompiledShader, this.mFragmentShader);

    gl.linkProgram(this.mCompiledShader);

    // Step C: Check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        throw new Error("Error Linking Shader");
        return null;
    }

    // Step D: reference to aVertexPosition attribute in the shaders
    this.mVertexPositionRef = gl.getAttribLocation(
        this.mCompiledShader,
        "aVertexPosition"
    );
  }
}
