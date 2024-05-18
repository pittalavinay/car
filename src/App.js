
import './App.css';
import { useState } from 'react';
import Login from './Login';
import  Res  from './Res';
import Cart from './Cart';

function App() {
  const[routes,setroutes]=useState(
    "login"
  );
  const change=(route)=>
  {
      
        setroutes(route);
      
  }
  return (
    <div className="App">
      {routes==="cart"? <Cart change={change}/>:routes==="login"?<Login change={change}/>:<Res change={change}/>}
     
    </div>
  );
}

export default App;
