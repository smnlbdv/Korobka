import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import style from './productPage.module.scss'
import { AuthContext } from "../../context/authContext";

import api from '../../api/api.js'

const ProductPage = () => {
    // const [selectedProduct, setSelectedProduct] = useState(null);
    const { id } = useParams();
    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        selectionProduct(id)
    }, [])

    const selectionProduct  = async (id) => {
        const token = JSON.parse(localStorage.getItem('userData')) || '';
        try {
          await api.get(`/api/products/${id}`, {
            headers: {
              'Authorization': `${token.token}`,
            }})
            .then(response => {
              if(response.status == 202) {
                console.log(response)
              } 
            })
            .catch(response => {
              if(response.response.status == 400) {
                console.log(response)
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

    return ( 
        <section className={style.main__block_product}>
            <div className={style.block__adding__product}>
                <div className={style.product__image}>
                    <img src="" alt="Product image" />
                </div>
                <div>

                </div>
            </div>
            <div className={style.block__information}>

            </div>
        </section>
     );
}
 
export default ProductPage;