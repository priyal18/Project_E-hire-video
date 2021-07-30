import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";
import "../css/Editor.css";

function Editor() {
  const { id: roomId } = useParams();
  const [output, setOutput] = useState(" ");
  const [input, setInput] = useState("Hello");
  const [theme, setTheme] = useState("tomorrow");
  const [language, setLanguage] = useState("csharp");
  const [codelanguage, setCodelanguage] = useState("cpp");
  const [fontsize, setFontsize] = useState(16);
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
	
	cout<<"Hello World!";
	
	return 0;
}`);

  const socketRef = useRef();

  useEffect(() => {
   // socketRef.current = io.connect("http://localhost:5000");
    socketRef.current = io.connect("https://lit-stream-68135.herokuapp.com/");

    socketRef.current.emit("join-room", roomId);
    socketRef.current.on("codeChanged1", (code) => {
      setCode(code);
    });
    socketRef.current.on("outputChanged1", (value) => {
      setOutput(value);
    });
    socketRef.current.on("inputChanged1", (value) => {
      setInput(value);
    });
    socketRef.current.on("recieve-output", (body) => {
      console.log("body:", body);
      const output = body["output"];
      socketRef.current.emit("outputChanged", [output, roomId]);
      setOutput(output);
    });
    return () => socketRef.current.disconnect();
  }, [code, output]);

  const codeChanged = (code) => {
    socketRef.current.emit("codeChanged", [code, roomId]);
    setCode(code);
  };
  const inputChanged = (event) => {
    const val = event.target.value;
    console.log(val);
    socketRef.current.emit("inputChanged", [val, roomId]);
    setInput(val);
  };
  const outputChanged = () => {};

  const submitCode = (event) => {
    event.preventDefault();
    // const body = JSON.stringify({
    //   clientId: "e2e21cfc5d6236eb4a869c768c24e64f",
    //   clientSecret:
    //     "65189410b744a30068e3fdcc7ca083147bc103c2dc083309bb38dc157fb50c09",
    //   script: text,
    //   language: "cpp",
    //   versionIndex: "3",
    //   stdin: "Hello",
    // });
    const body = {
      clientId: "e2e21cfc5d6236eb4a869c768c24e64f",
      clientSecret:
        "65189410b744a30068e3fdcc7ca083147bc103c2dc083309bb38dc157fb50c09",
      script: code,
      language: codelanguage,
      versionIndex: "3",
      stdin: input,
    };

    console.log(body);
    // fetch("http://localhost:4000/submit", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: body,
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     socketRef.current.emit("outputChanged", json["output"]);
    //     setOutput(json["output"]);
    //   })
    //   .catch((err) => console.log(err));

    socketRef.current.emit("submit-code", [body, roomId]);
  };
  const themeChangeHandler = (e) => {
    setTheme(e.target.value);
  };
  const languageChangeHandler = (e) => {
    const a = e.target.value;
    if (a === "csharp") {
      setCodelanguage("cpp");
      setCode(`#include <iostream>
using namespace std;

int main() {
  
  cout<<"Hello World!";
  
  return 0;
}`);
    } else if (a === "python") {
      setCodelanguage("python3");
      setCode(`print("Hello World!")`);
    } else {
      setCodelanguage(a);
      setCode(`public class Interview {
    public static void main(String[] args) {
        System.out.print("Hello World");
    }
}`);
    }
    setLanguage(a);
  };
  const sizeChangeHandler = (e) => {
    setFontsize(Number(e.target.value));
  };

  return (
    <div className='editor-div'>
      <div className='editor-header'>
        <h2>E-HIRE</h2>
      </div>
      <div className='editor-buttons'>
        <div className='language-div'>
          <label htmlFor='language'>Language: </label>
          <select
            name='language'
            id='language'
            onChange={languageChangeHandler}
          >
            <option value='csharp'>C++</option>
            <option value='java'>Java</option>
            <option value='python'>Python</option>
          </select>
        </div>
        <div className='theme-div'>
          <label htmlFor='theme'>Theme: </label>
          <select name='theme' id='theme' onChange={themeChangeHandler}>
            <option value='tomorrow'>Tomorrow</option>
            <option value='monokai'>Monokai</option>
            <option value='github'>Github</option>
            <option value='solarized_dark'>Dark</option>
            <option value='solarized_light'>Light</option>
          </select>
        </div>
        <div className='size-div'>
          <label htmlFor='size'>Font size: </label>
          <select name='size' id='size' onChange={sizeChangeHandler}>
            <option value='12'>12</option>
            <option value='14'>14</option>
            <option value='16' selected>
              16
            </option>
            <option value='18'>18</option>
            <option value='20'>20</option>
          </select>
        </div>
      </div>
      <div className='main-editor'>
        <AceEditor
          mode={language}
          theme={theme}
          height='60vh'
          width='810px'
          fontSize={fontsize}
          value={code}
          onChange={codeChanged}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
      <div className='input-output-div'>
        <div className='input-div'>
          Input
          <br />
          <textarea className='input' onChange={inputChanged} value={input} />
        </div>
        <div className='output-div'>
          Output
          <br />
          <textarea
            className='output'
            onChange={outputChanged}
            value={output}
          />
        </div>
      </div>
      <div className='submit-button'>
        {/* <div className='back' onClick={() => (window.location.href = "/")}>
          Back
        </div> */}
        <button type='submit' onClick={submitCode}>
          Submit Code
        </button>
      </div>
    </div>
  );
}

export default Editor;





// PREVIOUSLY HOSTED CODE



// import React, { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-csharp";
// import "ace-builds/src-noconflict/theme-tomorrow";
// import "ace-builds/src-noconflict/theme-monokai";
// import "../css/Editor.css";

// function Editor() {
//   const { id: roomId } = useParams();
//   const [output, setOutput] = useState(" ");
//   const [input, setInput] = useState("Hello");
//   const [code, setCode] = useState(`#include <iostream>
// using namespace std;

// int main() {

//   string str;
//   cin>>str;
//   cout<<str;

//   return 0;
// }`);

//   const socketRef = useRef();

//   useEffect(() => {
//     //socketRef.current = io.connect("http://localhost:5000");
//     socketRef.current = io.connect("https://lit-stream-68135.herokuapp.com/");

//     socketRef.current.emit("join-room", roomId);

//     socketRef.current.on("codeChanged1", (code) => {
//       setCode(code);
//     });

//     socketRef.current.on("outputChanged1", (value) => {
//       setOutput(value);
//     });

//     socketRef.current.on("inputChanged1", (value) => {
//       setInput(value);
//     });

//     socketRef.current.on("recieve-output", (body) => {
//       const output = body["output"];
//       socketRef.current.emit("outputChanged", [output, roomId]);
//       setOutput(body["output"]);
//     });

//     return () => socketRef.current.disconnect();
//   }, [code, output]);

//   const codeChanged = (code) => {
//     socketRef.current.emit("codeChanged", [code, roomId]);
//     setCode(code);
//   };

//   const inputChanged = (event) => {
//     const val = event.target.value;
//     socketRef.current.emit("inputChanged", [val, roomId]);
//     setInput(event.target.value);
//   };

//   const outputChanged = () => {};

//   const submitCode = (event) => {
//     event.preventDefault();
//     const body = {
//       clientId: "e2e21cfc5d6236eb4a869c768c24e64f",
//       clientSecret:
//         "65189410b744a30068e3fdcc7ca083147bc103c2dc083309bb38dc157fb50c09",
//       script: code,
//       language: "cpp",
//       versionIndex: "3",
//       stdin: input,
//     };
//     socketRef.current.emit("submit-code", [body, roomId]);
//   };

//   return (
//     <div>
//       <p>Editor</p>
//       <div className='editor'>
//         <div className='code-editor'>
//           <AceEditor
//             mode='csharp'
//             theme='monokai'
//             fontSize={16}
//             height='400px'
//             width='800px'
//             value={code}
//             onChange={codeChanged}
//             showPrintMargin={true}
//             showGutter={true}
//             highlightActiveLine={true}
//             setOptions={{
//               enableBasicAutocompletion: false,
//               enableLiveAutocompletion: false,
//               enableSnippets: false,
//               showLineNumbers: true,
//               tabSize: 4,
//             }}
//           />
//         </div>
//         <div className='input-output-div'>
//           <div className='input-div' style={{ display: "inline-block" }}>
//             <p>Input</p>
//             <textarea
//               className='input'
//               style={{ height: "100px", width: "200px" }}
//               onChange={inputChanged}
//               value={input}
//             />
//           </div>
//           <div className='output-div' style={{ display: "inline-block" }}>
//             <p>Output</p>
//             <textarea
//               className='output'
//               style={{ height: "100px", width: "200px" }}
//               onChange={outputChanged}
//               value={output}
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <button type='submit' onClick={submitCode}>
//           Submit Code
//         </button>
//       </div>
//       <div>
//         <p className='back' onClick={() => (window.location.href = "/")}>
//           Back
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Editor;
