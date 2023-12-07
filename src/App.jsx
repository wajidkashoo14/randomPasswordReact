import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

   const passwordRef = useRef(null)


  const randomNumber = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, characters]);

  useEffect(() => {
    randomNumber();
  }, [numbers, characters, length, randomNumber]);
   
  const copyPassword = useCallback(() => {

    passwordRef?.current.select();
    passwordRef?.current.setSelectionRange(0, 20)
    window.navigator.clipboard.writeText(password)
  
  }, [password]);


 
  return (
    <div className="w-[40rem] h-[15rem] font-semibold bg-blue-700 rounded-lg">
      <h1 className="text-2xl text-center py-6">Password Generator</h1>
      <div className="flex mx-10 overflow-hidden rounded-lg">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="w-full outline-none bg-white py-1 px-3 text-blue-500"
        />
        <button className=" shrink-0 rounded-0 outline-none bg-green-700 text-lg" onClick={copyPassword}>
          Copy
        </button>
      </div>
      <div className="flex flex-wrap mx-10 mt-8 gap-3 align-center">
        <input
          onChange={(e) => {
            setLength(e.target.value);
          }}
          type="range"
          className="outline-none"
          value={length}
          min={6}
          max={20}
        />
        <label>Length: {length}</label>
        <input
          onChange={() => {
            setNumbers((prev) => !prev);
          }}
          type="checkbox"
          defaultChecked={numbers}
          className="outline-none"
        />
        <label>Numbers</label>
        <input
          onChange={() => {
            setCharacters((prev) => !prev);
          }}
          type="checkbox"
          defaultChecked={characters}
          className="outline-none"
        />
        <label>Chracters</label>
      </div>
    </div>
  );
}

export default App;
