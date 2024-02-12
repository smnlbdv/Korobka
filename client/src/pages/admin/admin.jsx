/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, lazy, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/authContext.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Loading from "../../components/loading/loading.jsx";
const HomePageAdmin = lazy(() => import("../../pages/home/homePageAdmin.jsx"));
const ProductPage = lazy(() => import("../adminProduct/productPage.jsx"));

const Admin = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isValidAdmin, setIsValidAdmin] = useState(false);
    const { adminFetch, logout } = useContext(AuthContext)
    const nav = useNavigate()

    useEffect(() => {
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
        fetchData();
      }, []);

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
     );
}
 
export default Admin;