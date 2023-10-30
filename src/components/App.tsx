
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Canvas from './Pixels';

function App() {
  console.log("rerender")
  
  return (
    <div style = {{textAlign : "center"}} >
      <h1>Pixels</h1>
      <BrowserRouter>
        <Route path="/canvas/:canvasId" element={<Canvas/>}/>
      </BrowserRouter>
    </div>
  );
}
//


export default App;
