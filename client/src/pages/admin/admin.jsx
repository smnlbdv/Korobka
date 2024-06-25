/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/authContext.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { notification, Modal } from 'antd';

import api from "../../api/api.js";
import { Button, message, Space } from 'antd';

import { AdminContext } from "../../context/adminContext.js";
import Loading from "../../components/loading/loading.jsx";
import OneProductPage from "../oneProductPage/oneProductPage.jsx";
import OnePostCard from "../onePostCard/onePostCard.jsx";
import UserPage from "../userPage/userPage.jsx";
import Orders from "../orders/orders.jsx";
const HomePageAdmin = lazy(() => import("../../pages/home/homePageAdmin.jsx"));
const MainPageAdmin = lazy(() => import("../mainPageAdmin/mainPageAdmin.jsx"));
const ProductPage = lazy(() => import("../adminProduct/productPage.jsx"));  

const Admin = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isValidAdmin, setIsValidAdmin] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const { adminFetch, logout } = useContext(AuthContext)
    const [product, setProduct] = useState();
    const [postCard, setPosrCard] = useState();
    const [typesBox, setTypesBox] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [allStatus, setAllStatus] = useState([]);
    const nav = useNavigate()

    const { getTypesBox, getProduct, getPostCard} = useContext(AuthContext)
    
    const [messageApi, contextHolder] = message.useMessage();
    const [modal, contextHolderEmail] = Modal.useModal();

    useEffect(() => {
      fetchData();
      getAllProduct();
      fetchDataCategory()
      fetchDataOrder()
      getProducts()
      fetchAllUsers()
      fetchRoles()
      getAllOrders()
      fetchStatus()
    }, []);

    const success = (value) => {
      messageApi.open({
        type: 'success',
        content: `${value}`,
      });
    };

    const getAllOrders = async () => {
      try {
        await api.get(`/api/admin/orders`)
          .then((response) => {
            setAllOrders(response.data);
          })
          .catch((error) => alert(error.message));
    } catch (error) {
        console.log("Ошибка", error);
    }
    }

    const deleteUser = async (id) => {
      try {
          await api.delete(`/api/admin/delete/user/${id}`)
            .then((response) => {
              setAllUsers(prevUsers => prevUsers.filter(user => user._id !== id));
              success("Пользователь успешно удален")
            })
            .catch((error) => alert(error.message));
      } catch (error) {
          console.log("Ошибка", error);
      }
  }

    const fetchData = async () => {
      try {
        const response = await adminFetch();
        setIsValidAdmin(response);
      } catch (error) {
        setIsValidAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRoles = async () => {
      try {
        await api.get("/api/admin/roles/all")
          .then((response) => {
            const roles = response.data.map(role => {
              let label = '';
              if (role.role === 0) {
                label = 'Пользователь';
              } else if (role.role === 1) {
                label = 'Администратор';
              } else if (role.role === 2) {
                label = 'Модератор';
              }
              return { label, value: role._id };
            });
            setAllRoles(roles);
          })
          .catch((error) => alert(error.message));
      } catch (error) {
        console.log("Ошибка", error);
      }
    };

    const fetchStatus = async () => {
      try {
        await api.get("/api/admin/status/all")
          .then((response) => {
            const formattedOptions = response.data.map(option => ({
              value: option._id,
              label: option.name,
              color: option.color
            }));
            setAllStatus(formattedOptions);
          })
          .catch((error) => alert(error.message));
      } catch (error) {
        console.log("Ошибка", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        await api.get(`/api/admin/users`)
          .then(response => {
            setAllUsers(response.data)
          })
          .catch(response => {
            console.log(response.message);
        });
      } catch (error) {
        console.log(error.message)
      }
    };

    const getProducts = async () => {
      const types = await getTypesBox();
      setTypesBox(types)
      const productRes = await getProduct()
      setProduct(productRes)
      const postCardRes = await getPostCard()
      setPosrCard(postCardRes)
    }

    const fetchDataCategory = async () => {
      try {
        await api.get(`/api/admin/stat/category`)
          .then(response => {
            setDataCategory(response.data)
          })
          .catch(response => {
            console.log(response.message);
        });
      } catch (error) {
        console.log(error.message)
      }
    };

    const fetchDataOrder = async () => {
      try {
        await api.get(`/api/admin/stat/order`)
          .then(response => {
            setDataOrder(response.data.order)
            setTotalPrice(response.data.totalPrice)
          })
          .catch(response => {
            console.log(response.message);
        });
      } catch (error) {
        console.log(error.message)
      }
    };

    const getAllProduct = async () => {
      try {
        await api.get("/api/products/all")
          .then((response) => {
            setAllProduct(response.data.products);
          })
          .catch((error) => alert(error.message));
      } catch (error) {
        console.log("Ошибка", error);
      }
    };

    const countDown = (type, message) => {
      if(type === 'success') {
        modal.success({
          title: 'Добавление товара',
          content: `${message}`,
        });
  
      }
      if (type === 'error') {
        modal.error({
          title: 'Добавление товара',
          content: `${message}`,
        });
  
      }
    };

    const openNotification = (placement, text) => {
      apis.success({
        message: <p>{text}</p>,
        placement,
        closeIcon: false,
        duration: 1.5,
      });
    };

    const deleteProductDB = async (id) => {
      try {
        const token = JSON.parse(localStorage.getItem('userData')) || '';
        await api.delete(`/api/admin/delete/${id}`, {
          headers: {
            'Authorization': `${token.token}`,
          }})
          .then((response) => {
            if(response.status === 202) {
              setAllProduct(prevProducts => prevProducts.filter(product => product._id !== id));
              openNotification('bottomRight', 'Товар успешно удален из БД');
            }
          })
          .catch(response => 
            {
              if(response.response.status == 401) {
                logout()
                nav("/api/auth/login");
              }
            }
          );
      } catch (error) {
        console.log("Ошибка", error);
      }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return ( 
      <AdminContext.Provider
        value={{
          contextHolder,
          contextHolderEmail,
          countDown,
          openNotification,
          deleteProductDB,
          deleteUser,
          dataOrder,
          product,
          allStatus,
          allUsers,
          allOrders,
          success,
          postCard,
          allRoles,
          typesBox,
          totalPrice,
          allProduct,
          dataCategory,
          setAllProduct
         }}>
        <Routes>
          <Route
              path="/*"
              element={
                <Suspense fallback={<Loading />}>
                  <HomePageAdmin/>
                </Suspense>
              }
            >
              <Route index element={<MainPageAdmin />} />
              <Route path="product-page" element={<ProductPage />} />
              <Route path="page/product" element={<OneProductPage />} />
              <Route path="page/postcard" element={<OnePostCard />} />
              <Route path="page/users" element={<UserPage />} />
              <Route path="page/orders" element={<Orders />} />
          </Route>
        </Routes>
      </AdminContext.Provider>
     );
}
 
export default Admin;