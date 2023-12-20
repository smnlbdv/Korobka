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
const Liked = lazy(() => import("./pages/liked/liked.jsx"));

function App() {
  const [cart, setCart] = useState([]);
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [cartPrice, setCartPrice] = useState();
  const [newBoxList, setNewBoxList] = useState([]);
  const { login, logout, token, userId } = useAuth();
  const [apis, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const isLogin = !!token;

  useEffect(() => {
    getNewProduct()
  }, [])

  const calculatePrice = () => {
    const total = cart.reduce((accumulator, product) => {
        const subtotal = product.count * product.price;
        return accumulator + subtotal;
    }, 0);
    setCartPrice(total)
  }

  const getNewProduct = async () => {
    try {
      await api.get('/api/products/new')
                 .then(response => setNewBoxList(response.data))
                 .catch(error => alert(error.message))
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const openNotification = (placement, text) => {
    apis.success({
      message: <p>{text}</p>,
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
            openNotification('bottomRight', 'Товар успешно добавлен в корзину') 
          } else {
            const product = {
              ...response.data.product,
              count: response.data.count
            }
            setCart((prevCart) => [...prevCart, product]);
            openNotification('bottomRight', 'Товар успешно добавлен в корзину')
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

  const increaseCartItem = async (id) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/cart/increase/`, {id: id}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          const index = cart.findIndex(item => item._id === id);
          if(index !== -1) {
            cart[index]['count'] += 1
            calculatePrice()
          }
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
  }

  const decreaseCartItem = async (id) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/cart/decrease/`, {id: id}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          const index = cart.findIndex(item => item._id === id);
          if(index !== -1) {
            cart[index]['count'] -= 1
            calculatePrice()
          }
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
  }


  const deleteItemCart = async (productId) => {
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
  }

  const addProductFavorite = async (productId) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post('/api/favorite/add', {userId: data.userId, favoriteId: productId}, {
        headers: {
          'Authorization': `${data.token}`,
        }})
        .then(response => {
          // console.log(response.data)
          setFavoriteItem((prevFavorite) => [...prevFavorite, response.data]);
          openNotification('bottomRight', response.data.message)
          // const index = cart.findIndex(item => item._id === response.data.product._id);
          // if(index !== -1) {
          //   cart[index]['count'] = response.data.count
          //   openNotification('bottomRight') 
          // } else {
          //   const product = {
          //     ...response.data.product,
          //     count: response.data.count
          //   }
          //   setCart((prevCart) => [...prevCart, product]);
          //   openNotification('bottomRight')
          // }
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
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isLogin,
        addCart,
        cart,
        setCart,
        deleteItemCart,
        increaseCartItem,
        decreaseCartItem,
        calculatePrice,
        cartPrice,
        contextHolder,
        newBoxList,
        unmountItem,
        favoriteItem,
        addProductFavorite
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
            <Route path="liked" element={<Liked />} />
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
