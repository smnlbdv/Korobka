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
const Admin = lazy(() => import("./pages/admin/admin.jsx"));
const OrderPage = lazy(() => import("./pages/orderPage/orderPage.jsx"));
const ReviewPage = lazy(() => import("./pages/reviewPage/reviewPage.jsx"));
const ConstructorBox = lazy(() => import("./pages/constructorBox/constructorBox.jsx"));

function App() {
  const [reviewsList, setReviewsList] = useState([])
  const [profile, setProfile] = useState({});
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories,setCategories] = useState([]);
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [newBoxList, setNewBoxList] = useState([]);
  const [modal, contextHolderEmail] = Modal.useModal();
  const { login, logout, token, userId, role, setRole } = useAuth();
  const [apis, contextHolder] = notification.useNotification();
  const [checkArray, setCheckArray] = useState([]);
  const navigate = useNavigate();
  const isLogin = !!token;

  useEffect(() => {
    if(isLogin) {
      getProfile()
    }
  }, [isLogin])

  useEffect(() => {
    getNewProduct()
    getBestReviews()
    getCategories()
  }, [])

  const calculatePrice = useCallback((cart) => {
    const total = cart.reduce((accumulator, product) => {
      const subtotal = product.count * product.price;
      return accumulator + subtotal;
    }, 0);
    setCartTotalPrice(total);
    return total;
  }, [cart]);

  
  const postLogin = async (values) => {
    try {
      await api.post("/api/auth/login", values)
               .then((res) => {
                  login(res.data.tokens.accessToken, res.data.user.id, res.data.user.role);
                  if (res.status === 200) {
                    navigate("/");
                  }
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    openNotificationError('bottomRight', error.response.data.message)
                  }
                })
    } catch (error) {
      console.log(error.message);
    }
  }

  const postRegistration = async (values) => {
    try {
      await api.post("/api/auth/registration", values)
              .then((res) => {
                if (res.status === 200) {
                    navigate("/api/auth/login");
                }
              })
              .catch((error) => {
                if (error.response.status === 300) {
                  openNotificationError('bottomRight', error.response.data.message)
                }
              })
    } catch (error) {
      console.log(error.message);
    }
  }

  const getProfile = async () => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.get(`/api/profile/${userId}`, {
        headers: {
            'Authorization': `${token.token}`,
        }})
        .then(response => {

          const fieldsToExclude = ['cart', 'older', 'favorite'];
          const userObject = Object.assign({}, response.data);
          for (const field of fieldsToExclude) {
            if (Object.prototype.hasOwnProperty.call(userObject, field)) {
              delete userObject[field];
            }
          }

          setProfile({...userObject})
          setRole(userObject.role)

          if(response.data.cart && cart.length == 0) {
            const newCart = [...response.data.cart.items]
            const newCartItem = newCart.map(item => ({
              ...item.product,
              count: item.quantity,
            }));
            setCart(newCartItem);
          }

          if(response.data.favorite && favoriteItem.length == 0) {
            const newFavorite = [...response.data.favorite.items]
            setFavoriteItem(newFavorite)
          }

          if(response.data.order && order.length == 0) {
            setOrder([...response.data.order])
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

  const getCategories = async () => {
    try {
      await api.get('/api/category/all')
        .then(response => {
          setCategories([...response.data.categories]);
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

  const getTypesBox = async () => {
    let typesBox
    try {
      await api.get('/api/products/box/types')
        .then(response => {
          typesBox = response.data
        })
        .catch(response => {
          if(response.response.status == 401) {
            console.log(response.response);
          }
        })
        return typesBox
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const countDown = (type, message) => {
    if(type === 'success') {
      modal.success({
        title: 'Подписка на новости Korobka',
        content: `${message}`,
        okText: 'Хорошо',
      });

    }
    if (type === 'error') {
      modal.error({
        title: 'Подписка на новости Korobka',
        content: `${message}`,
        okText: 'Хорошо',
      });

    }
  };

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

  const addCart = async (objId) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/cart/add/${objId}`, {userId}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          if(response.data.count > 1) {
            const cartItemIndex = cart.findIndex(item => item._id === response.data.product._id);
            cart[cartItemIndex].count = response.data.count;
            openNotification('bottomRight', 'Товар успешно добавлен в корзину');
          } else {
            const product = {
              ...response.data.product,
              count: response.data.count,
            };
            setCart(prevCart => [...prevCart, product]);
            openNotification('bottomRight', 'Товар успешно добавлен в корзину');
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

  const increaseCartItem = async (id, cartCheck) => {
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
            if(cartCheck) {
              calculatePrice(checkArray)
              return response.data.increase
            }
            calculatePrice(cart)
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

  const decreaseCartItem = async (id, cartCheck) => {
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
            if(cartCheck) {
              calculatePrice(checkArray)
              return response.data.increase
            }
            calculatePrice(cart)
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

  const deleteItemCart = async (productId, order = false) => {
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
            order && openNotificationError('bottomRight', "Товар удален из корзины")
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

  const addProductFavorite = async (objId) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/favorite/add/${objId}`, {userId}, {
        headers: {
          'Authorization': `${token.token}`,
        }})
        .then(response => {
          setFavoriteItem((prevFavorite) => [...prevFavorite, response.data.product]);
          openNotification('bottomRight', response.data.message)
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

  const deleteProductFavorite = async (productId) => {
    const token = JSON.parse(localStorage.getItem('userData')) || '';
      try {
        await api.delete(`/api/favorite/delete/${productId}`, {
          headers: {
            'Authorization': `${token.token}`,
          }
        })
          .then(response => {
            if(response.data.delete === true) {
              setFavoriteItem((cart) =>
                cart.filter((item) => item._id !== productId)
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
            if(response.status == 200) {
              openNotification('bottomRight', response.data.message)
            }
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

  const adminFetch = async () => {
    let message;
    try {
      await api.get(`/api/auth/admin/${userId}`)
        .then(response => {
          message = response.data.message;    
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
    return message
  }

  const postCheckOrder = async (orderId) => {
    let url;
    const token = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.get(`/api/profile/order/${orderId}/check`, {
          headers: {
            'Authorization': token.token,
          }
        })
        .then(response => {
          if(response.status == 200) {
            url = response.data.url
          }    
        })
        .catch(response => {
          if(response.response.status == 401) {
            logout()
            navigate("/api/auth/login");
          }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
        navigate("/api/auth/login");
      } else {
        console.log(error.message);
      }
    }
    return url
  }

  const placeOrder = async (order) => {
    let result;
    let finalCart = checkArray.length !== 0 ? checkArray : cart;
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.post(`/api/profile/order`, {order: order, cart: finalCart, totalAmount: calculatePrice(finalCart) }, {
        headers: {
            'Authorization': `${data.token}`,
        }})
        .then(response => {
          if(response.status == 200 && response.data.success === true) {
            result = {
              result: response.data.success,
              message: response.data.messagee,
              url: response.data.url
            }
            setOrder((prev) => [...prev, response.data.order])
            openNotification('bottomRight', response.data.message)
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
    return result
  }

  const deleteOrderItem = async(orderId) => {
    const data = JSON.parse(localStorage.getItem('userData')) || '';
    try {
      await api.delete(`/api/profile/delete-order/${orderId}`, {
        headers: {
            'Authorization': `${data.token}`,
        }
      })
        .then(response => {
          if(response.status === 200 && response.data.success === true) {
            openNotificationError('bottomRight', response.data.message)
            setOrder((cart) =>
                cart.filter((item) => item._id !== orderId)
            );  
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
  }

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 20);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isLogin,
        role,
        addCart,
        cart,
        setCart,
        deleteItemCart,
        increaseCartItem,
        decreaseCartItem,
        cartTotalPrice,
        contextHolder,
        contextHolderEmail,
        newBoxList,
        unmountItem,
        favoriteItem,
        addProductFavorite,
        setFavoriteItem,
        deleteProductFavorite,
        sendEmailData,
        uploadAvatar,
        getProfile,
        profile,
        setProfile,
        updateProfileUser,
        order,
        updatePassUser,
        reviewsList,
        getBestReviews,
        calculatePrice,
        adminFetch,
        categories,
        placeOrder,
        setOrder,
        deleteOrderItem,
        scrollToTop,
        getCategories,
        checkArray,
        setCheckArray,
        getTypesBox,
        postRegistration,
        postLogin,
        postCheckOrder
      }}
    >
        <Routes>
          <Route
              path="/*"
              element={
                  <HomePage/>
              }
            >
              <Route index element={<Main />} />
              <Route path="constructor" element={<ConstructorBox />} />
              <Route path="ready-gifts/:category" element={<ReadyGifts />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="cart" element={<Cart />}></Route>
              <Route path="liked" element={<Liked />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product/:id/" element={<ProductPage/>}/>
              <Route path="product/:id/review" element={<ReviewPage/>}/>
              <Route path="cart/order" element={<OrderPage/>}/>
          </Route>
          <Route path="/api/auth/*" element={
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            }>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="admin/:userId/*" element={<Admin />} />
          </Route>
        </Routes>
    </AuthContext.Provider>
  );
}

export default App;
