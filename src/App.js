import { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Canvas from './components/Canvas';

function App() {
  const [src, setSrc] = useState();
  return (
    !src ? 
      <HomePage src={src} setSrc={setSrc} /> 
      : <Canvas image={src} setSrc={setSrc}/>
  );
}

export default App;
