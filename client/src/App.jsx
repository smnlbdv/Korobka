import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext.js";
import { useAuth } from "./hooks/auth.hook.js";
import {  notification } from 'antd';
import './libs/ant.css'

import Loading from "./components/loading/loading.jsx";
import Cart from "./pages/cart/cart.jsx";
import api from './api/api.js'

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
  const [newBoxList, setNewBoxList] = useState([]);
  const { login, logout, token, userId, isReady } = useAuth();
  const [apis, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const isLogin = !!token;

  useEffect(() => {
    getNewProduct()
  }, [])

  const getNewProduct = async () => {
    try {
      await api.get('/api/products/new')
                 .then(response => setNewBoxList(response.data))
                 .catch(error => alert(error.message))
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const openNotification = (placement) => {
    apis.success({
      message: <p>Товар успешно добавлен в корзину</p>,
      placement,
      closeIcon: false,
      duration: 1.5,
    });
  };

  const addCart = async (obj) => {
    try {
      await api.post('/api/cart/add', {userId, itemId: obj._id}, {
        headers: {
          'Authorization': `${token}`,
        }})
        .then(response => {
          console.log(response.data)
          if(cart.some(item => item._id === response.data.product._id)) {
            const cartItem = cart.filter(item => item._id === response.data.product._id)
            const updatedCartItems = cart.filter(item => item._id !== response.data.product._id)
            cartItem[0]['count'] = response.data.count
            updatedCartItems.push(cartItem[0])
            setCart(updatedCartItems);
            openNotification('bottomRight')
          } else {
            const product = {
              ...response.data.product,
              ...response.data.count
            }
            setCart((prevCart) => [...prevCart, product]);
            openNotification('bottomRight')
          }
        })
        .catch(response => {
          if(response.response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
      });
      
    } catch (error) {
      console.log(error.message)
    }

  };

  const calcCountItem = (_id, value) => {
    cart.forEach(element => {
      if(element._id === _id) {
        element.count += value
      }
    });
  }

  const deleteItemCart = (id) => {
    setCart((cart) =>
      cart.filter((item) => item._id != id)
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
        contextHolder,
        newBoxList,
      }}
    >
      {/* <Router> */}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage/>
              </Suspense>
            }
          >
            <Route index element={<Main />} />
            <Route path="ready-gifts" element={<ReadyGifts />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="/api/auth/*" element={
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            }>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      {/* </Router> */}
    </AuthContext.Provider>
  );
}

export default App;
