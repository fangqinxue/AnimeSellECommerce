
import Signup from "./Login/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from './Login/login';
import Home from "./Home/home";
import ShopCart from "./ShopCart/ShopCart"


function App() {

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/shopcart" element={<ShopCart />}></Route>


      </Routes>
    
    </BrowserRouter>

  )

}

export default App
