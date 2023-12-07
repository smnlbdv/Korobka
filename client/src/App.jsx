import { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/authContext.js";
import { useAuth } from "./hooks/auth.hook.js";
import {  notification } from 'antd';
import './libs/ant.css'

import Loading from "./components/loading/loading.jsx";
import Cart from "./pages/cart/cart.jsx";

const HomePage = lazy(() => import("./pages/home/homePage.jsx"));
const Auth = lazy(() => import("./pages/auth/auth.jsx"));
const Main = lazy(() => import("./pages/main/main.jsx"));
const ReadyGifts = lazy(() => import("./pages/readyGifts/readyGifts.jsx"));
const Registration = lazy(() => import("./components/registration/registration.jsx"));
const Login = lazy(() => import("./components/login/login.jsx"));
const Contacts = lazy(() => import("./pages/contacts/contacts.jsx"));
const AboutUs = lazy(() => import("./pages/aboutUs/aboutUs.jsx"));

function App() {
  const [cart, setCart] = useState([]);
  const { login, logout, token, userId, isReady } = useAuth();
  const [api, contextHolder] = notification.useNotification();

  const isLogin = !!token;

  const openNotification = (placement) => {
    api.success({
      message: <p>Товар успешно добавлен в корзину</p>,
      placement,
      closeIcon: false,
      duration: 1.5,
    });
  };

  const addCart = (obj) => {

    if(cart.some(item => Number(item.id) === Number(obj.id))) {
      console.log('yes')
      const cartItem = cart.filter(item => Number(item.id) == Number(obj.id))
      const updatedCartItems = cart.filter(item => Number(item.id) !== Number(obj.id))
      cartItem[0]['count'] += 1
      updatedCartItems.push(cartItem[0])
      setCart(updatedCartItems);
      openNotification('bottomRight')
    } else {
      setCart([...cart, obj]);
      console.log('no')
      openNotification('bottomRight')
    }

  };

  const calcCountItem = (id, value) => {
    console.log(id)
    cart.forEach(element => {
      if(element.id === id) {
        element.count += value
      }
    });
  }

  const deleteItemCart = (id) => {
    console.log(id)
    setCart((cart) =>
      cart.filter(item => Number(item.id) !== Number(id))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isReady,
        isLogin,
        addCart,
        cart,
        setCart,
        deleteItemCart,
        calcCountItem,
        contextHolder
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
          >
            <Route index element={<Main />} />
            <Route path="ready-gifts" element={<ReadyGifts />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="/api/auth/*" element={<Auth />}>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
