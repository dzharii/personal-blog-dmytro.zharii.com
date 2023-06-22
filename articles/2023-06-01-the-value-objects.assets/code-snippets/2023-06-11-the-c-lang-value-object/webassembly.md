# Webassembly
Date: 2023-06-22

To compile C/C++ code to WebAssembly on Windows, you can use Emscripten. Emscripten is an open-source LLVM to JavaScript compiler that also supports WebAssembly as a target.

Follow these steps to install Emscripten and compile a C/C++ program to WebAssembly:

## Install Emscripten Windows

1. **Install Emscripten**

   Download and install Emscripten using git. Open your command prompt (cmd) or PowerShell and run:

   ```
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   .\emsdk install latest
   .\emsdk activate latest
   ```

   After these steps, Emscripten will be installed. Now you need to set the environment variables for Emscripten using the command:

   ```
   .\emsdk_env.bat
   ```

   Run `emcmdprompt.bat` for windows

2. **Compile Code to WebAssembly**

   To compile your C/C++ code to WebAssembly, you can use the `emcc` command. If your file is named `program.c`, you can compile it to WebAssembly using the following command:

   ```
   emcc program.c -s WASM=1 -o program.html
   ```

   Here, the `-s WASM=1` flag is used to specify that you want to compile to WebAssembly. The `-o program.html` flag tells Emscripten to also create an HTML file that you can use to run your program in a browser.

   After running the command, you should see a `program.wasm` file (the WebAssembly binary) along with a `program.js` file (the JavaScript “glue” code) and `program.html` file (a web page that loads the `.wasm` and `.js` files) in your directory.

3. **Run Your Program**

   To run your WebAssembly program, you need to host it on a local or remote server. Most browsers have restrictions that prevent loading WebAssembly modules over `file://` URIs.

   If you have Node.js installed, one simple way to do this is to install `http-server` via npm:

   ```
   npm install http-server -g
   ```

   Then, you can run the server in the directory containing your files:

   ```
   http-server . -p 8080
   ```

   Now, if you navigate to `http://localhost:8080/program.html` in your browser, you should see your program running.

Remember, this is a simplified guide, and there can be complexities and challenges when dealing with more complex programs, including interfacing between JavaScript and WebAssembly, memory management, and multi-threading.



