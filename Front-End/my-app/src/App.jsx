
import Signup from "./Login/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from './Login/login';
import Home from "./Home/home";
import ShopCart from "./ShopCart/ShopCart";
import ProductDetail from "./ProductDetail/productDetail";
import Checkout from "./ShopCart/Checkout";
import UserProfile from "./UserProfile/userProfile";
import Orders from "./Orders/MyOrder";
import Settings from "./Setting/Setting";
import AddressSetting from "./Setting/AddressSet";
import ProfileSetting from "./Setting/ProfileSet";
import AddressEdit from "./Components/form/addressEdit";

function App() {

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/shopcart" element={<ShopCart />}></Route>
        <Route path="/productdetail/:id" element={<ProductDetail />}></Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/addressSetting" element={<AddressSetting />} />
        <Route path="/profileSetting" element={<ProfileSetting />} />
        <Route path="/addressEdit" element={<AddressEdit />} />


      </Routes>
    
    </BrowserRouter>

  )

}

export default App
