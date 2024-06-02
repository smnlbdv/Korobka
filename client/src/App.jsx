/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/authContext.js";
import { useAuth } from "./hooks/auth.hook.js";
import { notification, Modal } from 'antd';
import './libs/ant.css'
import { useDispatch, useSelector } from "react-redux";
import { addProductFavorite } from "./store/likedSlice.js";
import { addProductCart } from "./store/cartSlice.js";
import { addInfoProfile, addProductProfile } from "./store/profileSlice.js";

import Loading from "./components/loading/loading.jsx";
import api from './api/api.js'
import ResetPassword from "./components/resetPassword/resetPassword.jsx";

const delayedImport = (component, delay) => new Promise(resolve => setTimeout(() => resolve(component), delay));
const lazyWithDelay = (importFunction, delay) => lazy(() => delayedImport(importFunction(), delay));

const HomePage = lazyWithDelay(() => import("./pages/home/homePage.jsx"), 700);
const Auth = lazyWithDelay(() => import("./pages/auth/auth.jsx"), 700);
const Main = lazyWithDelay(() => import("./pages/main/main.jsx"), 700);
const ReadyGifts = lazyWithDelay(() => import("./pages/readyGifts/readyGifts.jsx"), 700);
const Registration = lazyWithDelay(() => import("./components/registration/registration.jsx"), 700);
const Login = lazyWithDelay(() => import("./components/login/login.jsx"), 700);
const Contacts = lazyWithDelay(() => import("./pages/contacts/contacts.jsx"), 700);
const AboutUs = lazyWithDelay(() => import("./pages/aboutUs/aboutUs.jsx"), 700);
const Liked = lazyWithDelay(() => import("./pages/liked/liked.jsx"), 700);
const Profile = lazyWithDelay(() => import("./pages/profile/profile.jsx"), 800);
const ProductPage = lazyWithDelay(() => import("./pages/productPage/productPage.jsx"), 700);
const Cart = lazyWithDelay(() => import("./pages/cart/cart.jsx"), 700);
const Forgot = lazyWithDelay(() => import("./components/forgot/forgot.jsx"), 700);
const Admin = lazyWithDelay(() => import("./pages/admin/admin.jsx"), 700);
const OrderPage = lazyWithDelay(() => import("./pages/orderPage/orderPage.jsx"), 700);
const ReviewPage = lazyWithDelay(() => import("./pages/reviewPage/reviewPage.jsx"), 800);
const ConstructorBox = lazyWithDelay(() => import("./pages/constructorBox/constructorBox.jsx"), 700);

function App() {
  const [reviewsList, setReviewsList] = useState([])
  const [pay, setPay] = useState([])
  const [categories,setCategories] = useState([]);
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [newBoxList, setNewBoxList] = useState([]);
  const [modal, contextHolderEmail] = Modal.useModal();
  const { login, userId, role, logout, isAuth } = useAuth();
  const [apis, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart)
  const checkArray = useSelector(state => state.cart.checkArray)
  const orderArray = useSelector(state => state.cart.order)
  const order = useSelector(state => state.profile.order)
  const profile = useSelector(state => state.profile.profile)
  const cartPrice = useSelector(state => state.cart.cartPrice)

  useEffect(() => {
    getNewProduct()
    getBestReviews()
    getCategories()
    getWayPay()
  }, [])

  useEffect(() => {
    if(userId){
      getProfile()
    }
  }, [userId])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
  
    if (message) {
      navigate("/profile")
    }

  }, []);

  const calculatePrice = (cart) => {
    return cart.reduce((accumulator, product) => {
      const subtotal =  product.count * product.price;
      return accumulator + subtotal;
    }, 0);
  }

  const checkItemCart = () => {
    return checkArray && cart.length === checkArray.length
  }

  const postLogin = async (values) => {
    await api.post("/api/auth/login", values)
               .then((res) => { 
                  login(res.data.id, res.data.role);
                  if (res.status === 200) {
                      navigate("/");
                  }
              })
              .catch((error) => {
                openNotificationError('bottomRight', error.response.data.message)
              })
}

  const postRegistration = async (values) => {
    try {
      const response = await api.post("/api/auth/registration", values);

      if (response.status === 200) {
          navigate("/api/auth/login");
      }
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message) {
            openNotificationError('bottomRight', error.response.data.message);
        } else {
            console.error("Error occurred during registration:", error);
        }
    }
  }

  const getProfile = async () => {
    try {
      await api.get(`/api/profile/${userId}`)
        .then(response => {
          
          dispatch(addInfoProfile(response.data.user))

          if(response.data.cart && cart.length === 0) {
            const newCart = [...response.data.cart]
            const newCartItem = newCart.map(item => ({
              ...item.product,
              count: item.quantity,
            }));
            newCartItem.forEach(element => {
              dispatch(addProductCart(element))
            });
          }

          if(response.data.favorite && favoriteItem.length == 0) {
            const newFavorite = [...response.data.favorite]
            newFavorite.forEach(element => {
              dispatch(addProductFavorite(element))
            });
          }

          if(response.data.order.length !== 0 && order.length == 0) {
            response.data.order.forEach(element => {
              dispatch(addProductProfile(element))
            })
          }

        })
        .catch(response => {
          console.log(response.message);
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
        
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const getTypesBox = async () => {
    let typesBox
    try {
      await api.get('/api/constructor/box/types')
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

  const getProduct = async () => {
    let productBox
    try {
      await api.get('/api/constructor/product')
        .then(response => {
          productBox = response.data
        })
        .catch(response => {
          if(response.response.status == 401) {
            console.log(response.response);
          }
        })
        return productBox
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  const getPostCard = async () => {
    let postCard
    try {
      await api.get('/api/constructor/post-card')
        .then(response => {
          postCard = response.data
        })
        .catch(response => {
          if(response.response.status == 401) {
            console.log(response.response);
          }
        })
        return postCard
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
                 .then(response => {
                  setNewBoxList(response.data)
                 })
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

  const postResetPassword = async (values) => {
    try {
      await api.post('/api/auth/reset-password-request', {email: values.email})
        .then(response => {
          if(response.status == 201) {
            openNotification('bottomRight', response.data.message);
            setTimeout(() => {
              navigate("/api/auth/login")
            }, 1000)
          } 
        })
        .catch(response => {
          if(response.response.status == 400) {
            openNotificationError('bottomRight', response.response.data.message);
          }
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  const postTwoPassword = async (values, token) => {
    console.log(values, token);
    try {
      await api.post(`/api/auth/reset-password/${token}`, {password: values.password})
        .then(response => {
          if(response.status == 201) {
            openNotification('bottomRight', response.data.message);
            setTimeout(() => {
              navigate("/api/auth/login")
            }, 1000)
          } 
        })
        .catch(response => {
          if(response.response.status == 400) {
            openNotificationError('bottomRight', response.response.data.message);
          }
      });
    } catch (error) {
      console.log(error.message)
    }
  }

  const sendEmailData = async (email) => {
    try {
      await api.post('/api/email/send', {email: email})
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

  const updatePassUser = async (passData) => {
    let resultPass;
    try {
      await api.patch(`/api/profile/${userId}/password`, passData)
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

  const getWayPay = async () => {
    try {
      await api.get('/api/way-pay/all')
                .then(response => {
                  setPay(response.data)
                })
                .catch(error => alert(error.message))
    } catch (error) {
      console.log("Ошибка", error);
    }
  }
  
  const orderCheckout = async (order, values, promo = {percentage: 1} ) => {
    const items = order.map(item => ({
      id: item._id, 
      count: item.count,
      price: item.price,
      name: item.title
    }));
    try {
      await api.post('/api/profile/pay/checkout', {
        items: items, promo: promo.percentage})
                .then(response => {
                  localStorage.setItem('initialValues', JSON.stringify(values))
                  localStorage.setItem('order', JSON.stringify(order))
                  localStorage.setItem('promo', JSON.stringify(promo))

                  window.location = response.data.url
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

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 20);
    }
  };

  const checkLocalUser = () => {
    const user = localStorage.getItem("user");
    return !!user && !!JSON.parse(user)?.id;
}

  const PrivateRoute = ({isAllowed}) => {
    return (
      isAllowed ? <Outlet/> : <Navigate to={"/api/auth/login"}/>
    )
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userId,
        role,
        contextHolder,
        contextHolderEmail,
        newBoxList,
        orderCheckout,
        favoriteItem,
        getProduct,
        setFavoriteItem,
        sendEmailData,
        postResetPassword,
        uploadAvatar,
        getProfile,
        openNotification,
        openNotificationError,
        isAuth,
        getPostCard,
        updatePassUser,
        reviewsList,
        getBestReviews,
        pay,
        postTwoPassword,
        adminFetch,
        categories,
        scrollToTop,
        getCategories,
        getWayPay,
        getTypesBox,
        postRegistration,
        calculatePrice,
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

              <Route element={<PrivateRoute isAllowed={checkLocalUser()} />}>
                <Route path="cart" element={<Cart checkItemCart={checkItemCart()}/>}/>
                <Route path="liked" element={<Liked favoriteItem={favoriteItem}/>} />
                <Route path="profile" element={<Profile />} />
                <Route path="product/:id/review" element={<ReviewPage/>}/>
                <Route path="cart/order" element={<OrderPage/>}/>
              </Route>
                
              <Route path="product/:id" element={<ProductPage/>}/>

          </Route>
          <Route path="/api/auth/*" element={
              <Suspense fallback={<Loading />}>
                <Auth />
              </Suspense>
            }>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="admin/:userId/*" element={<Admin />} />
          </Route>
        </Routes>
    </AuthContext.Provider>
  );
}

export default App;
