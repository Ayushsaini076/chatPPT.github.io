import {React, useState } from 'react';
import pptxgen from "pptxgenjs";
import './App.css';

function App() {
  const [message,setMessage]= useState('');
  const [response,setResponse]=useState('');
  const [path,setPath]=useState('');

  const handleSubmit=async (e)=>{
    e.preventDefault();
    
    await fetch('https://chatpptbackend.onrender.com',{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({message})
      
    })
    .then((res)=>res.json())
    .then((data)=>{
      setResponse(data.message)
      setPath(data.imgpath)
    })

    // .then((data)=>setPath(data.imgpath))
    

 
  }

  const handleGen=(e)=>{
    e.preventDefault();
    
    let pptx = new pptxgen();
    let slide1 = pptx.addSlide();

    slide1.addText(
      `${message}`,
      { x:1, y:0.5, w:'80%', h:1, fontSize:36, align:'center', fill:{ color:'D3E3F3' }, color:'008899' }
    )

    slide1.addText(
      `${response}`,
      {x:1,y:3}
    )

    let slide2 = pptx.addSlide();

    slide2.addImage({
      path:""
    })
  
    pptx.writeFile({ fileName: `${message}.pptx` });

  }

  return (
    <div className="App">
      <h1>chatPPT</h1>
      <p>A place to convert your words into a powerpoint presentation</p>
      <form onSubmit={handleSubmit}>
        <textarea 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder='Ask anything' name="" id="" cols="30" rows="10"></textarea>
        <br />
        <button type='submit' >submit</button>
        <div>{response}</div>
        <img src={path} alt="" /> 
      </form>
      <button onClick={handleGen}>Generate PPT</button>
    </div>
  );
}

export default App;
