/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/authContext.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { notification, Modal } from 'antd';

import api from "../../api/api.js";

import { AdminContext } from "../../context/adminContext.js";
import Loading from "../../components/loading/loading.jsx";
const HomePageAdmin = lazy(() => import("../../pages/home/homePageAdmin.jsx"));
const ProductPage = lazy(() => import("../adminProduct/productPage.jsx"));  

const Admin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isValidAdmin, setIsValidAdmin] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const { adminFetch, logout } = useContext(AuthContext)
    const nav = useNavigate()

    const [apis, contextHolder] = notification.useNotification();
    const [modal, contextHolderEmail] = Modal.useModal();


    useEffect(() => {
      fetchData();
      getAllProduct();
    }, []);

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

    const getAllProduct = async () => {
      try {
        await api.get("/api/products/all")
          .then((response) => {
            setAllProduct(response.data.product);
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
        return <div>Loading...</div>; // Или любой компонент загрузки
    }
 
    if (!isValidAdmin) {
        setTimeout(() => {
            logout()
            nav("/")
        }, 2000);
        return <div>
            Вы не являетесь админом, обратитесь в администратору
        </div>
    }

    return ( 
      <AdminContext.Provider
        value={{
          contextHolder,
          contextHolderEmail,
          countDown,
          openNotification,
          deleteProductDB,
          allProduct,
          setAllProduct
         }}>
        <Routes>
          <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <HomePageAdmin/>
                </Suspense>
              }
            >
              <Route index element={<ProductPage />} />
          </Route>
        </Routes>
      </AdminContext.Provider>
     );
}
 
export default Admin;