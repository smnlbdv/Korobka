import { useState, useContext, useEffect } from "react";
import { Tabs, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import style from "./productPage.module.scss";
import api from "../../api/api.js";
import './ant.css'

import AdminProductItem from "../../components/adminProductItem/adminProductItem.jsx";
import { AdminContext } from "../../context/adminContext.js";
import { AuthContext } from "../../context/authContext.js";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [pathImage, setPathImage] = useState('');
  const [categoryInput, setCategoryInput] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const { countDown, openNotification, allProduct, setAllProduct, contextHolder, contextHolderEmail} = useContext(AdminContext);
  const {logout, categories} = useContext(AuthContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setPathImage(file);

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const items = categories.map(obj => ({ value: obj.value }));
    setOptions(items);
  }, [categories])

  const handleChange = (value) => {

    if(value.length !== 0) {
      const labels = value.map(item => {
        const foundItem = categories.find(option => option.value === item);
        return foundItem ? foundItem._id : null;
      });

      setCategoryInput(labels);
      formikProduct.setFieldValue("selectedOptions", "true");
    } else {
      formikProduct.setFieldValue("selectedOptions", "");
    }

  };

  const formikProduct = useFormik({
    initialValues: {
      title: "",
      text: "",
      price: "",
      preText: "",
      pageDesc: "",
      selectedOptions: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required(
        'Поле "Название продукта" обязательно для заполнения'
      ),
      selectedOptions: Yup.string().required('Это поле обязательно для выбора'),
      text: Yup.string().required('Поле "Текст" обязательно для заполнения'),
      price: Yup.number().required('Поле "Цена" обязательно для заполнения'),
      preText: Yup.string().required(
        'Поле "Краткое описание" обязательно для заполнения'
      ),
      pageDesc: Yup.string().required(
        'Поле "Описание страницы" обязательно для заполнения'
      ),
    }),

    onSubmit: async (item, { resetForm }) => {

      const formData = new FormData();

      formData.append("image", pathImage);

      categoryInput.forEach(category => {
        formData.append("category", category)
      })

      Object.keys(item).forEach(key => {
        formData.append(key, item[key]);
      });

      try {
        await api.post("/api/admin/add", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }})
          .then((response) => {
            if(response.status === 202) {
              resetForm();
              setSelectedImage(null)
              setPathImage(null)
              setCategoryInput(null)
              setOptions(null)
              setAllProduct((prev) => [...prev, response.data.newProduct])
              openNotification('bottomRight', 'Товар успешно добавлен в БД');
            }
          })
          .catch((response) => 
            console.log(response.message)
          );
      } catch (error) {
        console.log("Ошибка", error);
      }
    },
  });


  const itemsTabs = [
    {
      key: "1",
      label: "Все товары",
      children: (
        <div className={style.product__admin__block}>
          {allProduct.map((obj, index) => (
            <AdminProductItem key={obj._id} {...obj} />
          ))}
        </div>
      ),
    }
  ];

  return (
    <div className={style.block__product}>
      {contextHolder}
      {contextHolderEmail}
      <Tabs defaultActiveKey="1" items={itemsTabs}></Tabs>
    </div>
  );
};

export default ProductPage;
