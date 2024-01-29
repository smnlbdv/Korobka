/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext.js";
import { useAuth } from "./hooks/auth.hook.js";
import { notification, Modal } from 'antd';
import './libs/ant.css'

import Loading from "./components/loading/loading.jsx";
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
const Profile = lazy(() => import("./pages/profile/profile.jsx"));
const ProductPage= lazy(() => import("./pages/productPage/productPage.jsx"));
const Cart= lazy(() => import("./pages/cart/cart.jsx"));
const Forgot = lazy(() => import("./components/forgot/forgot.jsx"));

function App() {
  const [cart, setCart] = useState([]);
  const [reviewsList, setReviewsList] = useState([])
  const [profile, setProfile] = useState([]);
  const [order, setOrder] = useState([]);
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [cartPrice, setCartPrice] = useState();
  const [newBoxList, setNewBoxList] = useState([]);
  const [modal, contextHolderEmail] = Modal.useModal();
  const { login, logout, token, userId } = useAuth();
  const [apis, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const isLogin = !!token;

  useEffect(() => {
    if(isLogin) {
      if(cart.length == 0) {
        getCart()
      } 
      if(favoriteItem.length == 0 ) {
        getFavorite()
      }
    }
    getNewProduct()
    getBestReviews()
  }, [])

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

  const getProfile = async () => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.get(`/api/profile/${data.userId}`, {
        headers: {
            'Authorization': `${data.token}`,
        }})
        .then(response => {
          setProfile(response.data)
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


  const countDown = (type, message) => {
  if(type === 'success') {
    modal.success({
      title: 'Подписка на новости Korobka',
      content: `${message}`,
    });

  }
  if (type === 'error') {
    modal.error({
      title: 'Подписка на новости Korobka',
      content: `${message}`,
    });

  }
  };

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

  const openNotificationError = (placement, text) => {
    apis.error({
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
    console.log(obj)
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
          openNotification('bottomRight', 'Товар успешно добавлен в корзину')
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
    if(favoriteItem.some(item => item._id == productId)) {
      // favoriteItem.filter((item) => item._id !== productId)
    } else {
      const data = JSON.parse(localStorage.getItem('userData')) || '';
      try {
        await api.post('/api/favorite/add', {userId: data.userId, favoriteId: productId}, {
          headers: {
            'Authorization': `${data.token}`,
          }})
          .then(response => {
            setFavoriteItem((prevFavorite) => [...prevFavorite, response.data.product]);
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
      }
      catch (error) {
        console.log(error.message)
      }
    }
  }

  const deleteProductFavorite = async (productId) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
      try {
        await api.delete(`/api/favorite/delete/${productId}`, {
          headers: {
            'Authorization': `${data.token}`,
          }
        })
          .then(response => {
            if(response.data.delete === true) {
              setFavoriteItem((cart) =>
                cart.filter((item) => item._id != productId)
              );
            }
          })
          .catch(response => {
            if(response.response.status == 401) {
              logout()
              navigate("/api/auth/login");
            }
        }); 
      }
      catch (error) {
        console.log(error.message)
      }
  }

  const sendEmailData = async (email) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post('/api/email/send', {email: email}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          if(response.status == 202) {
            countDown('success', response.data.message)
          } 
        })
        .catch(response => {
          if(response.response.status == 400) {
            countDown('error', response.response.data.message) 
          }
          if(response.response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  const getFavorite = async () => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.get(`/api/favorite/${data.userId}`, {
        headers: {
            'Authorization': `${data.token}`,
        }})
        .then(response => {
            // const favorite = response.data.map(item => 
            //     {
            //       return {
            //         ...item.product,
            //       }; 
            //     } 
            //   );
            // setFavoriteItem(favorite)
            console.log
        })
        .catch(response => {
          if(response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
        })
        
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const uploadAvatar = async (formData) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    let url;
    try {
      await api.patch("/api/profile/upload-image", formData, {
        headers: {
            'Authorization': `${data.token}`,
            'Content-Type': 'multipart/form-data',
        }})
        .then(response => {
          openNotification('bottomRight', response.data.message)
          url = response.data.url
        })
        .catch(response => {
          console.log(response)
          if(response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
        })
        
    } catch (error) {
      console.log("Ошибка", error);
    }
    return url
  }

  const updateProfileUser = async (changedData) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.patch("/api/profile/update", changedData, {
        headers: {
            'Authorization': `${data.token}`,
        }})
        .then(response => {
            openNotification('bottomRight', response.data.message)
        })
        .catch(response => {
          if(response.response.status == 400) {
            openNotificationError('bottomRight', response.response.data.message)
          }
          if(response.response.status == 409) {
            openNotificationError('bottomRight', response.response.data.message)
          }
          if(response.response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
        })
        
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const updatePassUser = async (passData) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    let resultPass;
    try {
      await api.patch(`/api/profile/${data.userId}/password`, passData, {
        headers: {
            'Authorization': `${data.token}`,
        }})
        .then(response => {
          if(response.status == 201){ 
            openNotification('bottomRight', response.data.message)
            resultPass = response.data.resultPass
          }
        })
        .catch(response => {
          if(response.response.status == 400) {
            resultPass = response.response.data.resultPass
          }
          if(response.response.status == 500) {
            openNotificationError('bottomRight', response.response.data.message)
          }
          if(response.response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
        })
        
    } catch (error) {
      console.log("Ошибка", error);
    }
    return resultPass
  }

  const getBestReviews = async () => {
    try {
      await api.get('/api/reviews/best')
                .then(response => {
                  setReviewsList(response.data)
                })
                .catch(error => alert(error.message))
    } catch (error) {
      console.log("Ошибка", error);
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
        contextHolderEmail,
        newBoxList,
        unmountItem,
        favoriteItem,
        addProductFavorite,
        setFavoriteItem,
        deleteProductFavorite,
        sendEmailData,
        getCart,
        getFavorite,
        uploadAvatar,
        getProfile,
        profile,
        setProfile,
        updateProfileUser,
        order,
        updatePassUser,
        reviewsList,
        getBestReviews
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
            <Route path="profile" element={<Profile />} />
            <Route path="product/:id/:userId" element={<ProductPage/>}/>
          </Route>
          
          <Route path="/api/auth/*" element={
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            }>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot" element={<Forgot />} />
          </Route>
        </Routes>
    </AuthContext.Provider>
  );
}

export default App;
