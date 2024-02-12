import { useEffect, useState } from "react";
import { Tabs } from "antd";

import style from './productPage.module.scss'
import api from '../../api/api.js';

import AdminProductItem from "../../components/adminProductItem/adminProductItem.jsx";

const ProductPage = () => {

    const [allProduct, setAllProduct] = useState([])

    const getAllProduct = async () => {
        try {
          await api.get('/api/products/all')
                     .then(response => {
                      setAllProduct(response.data.product)
                     })
                     .catch(error => alert(error.message))
        } catch (error) {
          console.log("Ошибка", error);
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [])

    const itemsTabs = [
        {
          key: '1',
          label: 'Все товары',
          children:
          <div className={style.product__admin__block}>
            {
                allProduct.map((obj, index) => 
                <AdminProductItem
                    key={index}
                    {...obj}
                />
            )
            }
          </div>
        },
        {
          key: '2',
          label: 'Добавление товара',
          children: 
          <div>

          </div>
        }
      ];

    return ( 
        <div className={style.block__product}>
            <Tabs defaultActiveKey="1" items={itemsTabs}>
            </Tabs>
        </div>
     );
}
 
export default ProductPage;