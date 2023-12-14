/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useState, useEffect, useCallback } from "react";
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
    getCart()
  }, [isLogin])

  const getNewProduct = async () => {
    try {
      await api.get('/api/products/new')
                 .then(response => setNewBoxList(response.data))
                 .catch(error => alert(error.message))
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const getCart = async () => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.get(`/api/cart/${data.userId}`, {
        headers: {
            'Authorization': `${data.token}`,
        }})
        .then(response => {
          const product = response.data.map(item => 
            {
              return {
                ...item.product,
                count: item.quantity
              }; 
            } 
          );
          setCart(product)
        })
        .catch(response => {
            if(response.response.status == 401) {
                logout()
                navigate("/api/auth/login");
            }
        })
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

  const unmountItem = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id != id)
    );
    deleteItemCart(id)
  }

  const addCart = async (obj) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post('/api/cart/add', {userId, itemId: obj._id}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          const index = cart.findIndex(item => item._id === response.data.product._id);
          if(index !== -1) {
            cart[index]['count'] = response.data.count
            openNotification('bottomRight') 
          } else {
            const product = {
              ...response.data.product,
              count: response.data.count
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

  const increaseCartItem = useCallback( async (id) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/cart/increase/`, {id: id}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          return response.data.increase
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
  }, [])

  const decreaseCartItem = useCallback(async (id) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/cart/decrease/`, {id: id}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          return response.data.increase
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
  }, [])

  const deleteItemCart = useCallback(async (productId) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.delete(`/api/cart/delete/${productId}`, {
        headers: {
            'Authorization': `${data.token}`,
        },
      })
        .then(response => {
          if(response.data.delete === true) {
            setCart((cart) =>
              cart.filter((item) => item._id != productId)
            );
          }
        })
        .catch(response => {
          if(response.response.status == 401) {
              logout()
              navigate("/api/auth/login");
          }
        })
    } catch (error) {
      console.log("Ошибка", error);
    }
  }, []);

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
        increaseCartItem,
        decreaseCartItem,
        contextHolder,
        newBoxList,
        unmountItem
      }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;
