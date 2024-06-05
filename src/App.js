import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import {Layout, Item} from './components'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useSelector} from "react-redux";

function App() {

  const currentItem = useSelector(state => state.data.currentItem)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/item" element={<Item extendedView={true} item={currentItem}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
