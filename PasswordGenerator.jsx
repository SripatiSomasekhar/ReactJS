import { useCallback, useEffect, useState } from "react";

export default function PasswordGenerator(){
    const [length,setLength] = useState(0);
    const [password,setPassword] = useState('');
    const[isNumbersChecked,setIsNumbersChecked] = useState(false);
    const[isSpecialChecked,setIsSpecialChecked] = useState(false);

    let handleLength = (e)=>setLength(e.target.value);
    let handleIsNumbersChecked = ()=> setIsNumbersChecked(!isNumbersChecked);
    let handleIsSpecialChecked = ()=> setIsSpecialChecked(!isSpecialChecked);

    const generatePassword = useCallback(() =>{
        let newPassword = " ";
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(isNumbersChecked) str+="0123456789";
        if(isSpecialChecked) str+="!@#$%^&*()_-~";
        for(let i=0;i<length;i++){
            let ind = Math.floor(Math.random()*str.length);
            newPassword += str[ind];
        }
        setPassword(newPassword);
    },[length,isNumbersChecked,isSpecialChecked]);

    useEffect(generatePassword,
        [length,isNumbersChecked,isSpecialChecked]);
    const copyPassword = () => {
        window.navigator.clipboard.writeText(password);
    }
return(
<div className="container">
    <h1 className="text text-success">Password Generator</h1>
    <input type="text" className="form-control" value={password} readOnly/>
    <button className="btn btn-primary" onClick={copyPassword}>copy</button>
    <input type="range" min={0} max={20} value={length} onChange={handleLength}/>
    <label htmlFor="">Length : {length}</label>
    <input type="checkbox" onClick={handleIsNumbersChecked} /> 
    <label htmlFor="">Numbers</label>
    <input type="checkbox" onClick={handleIsSpecialChecked} />
    <label htmlFor="">Special</label>
</div>
);

}