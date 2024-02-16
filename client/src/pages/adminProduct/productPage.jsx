import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

import style from "./productPage.module.scss";
import api from "../../api/api.js";

import AdminProductItem from "../../components/adminProductItem/adminProductItem.jsx";
import InputProfile from "../../components/inputProfile/inputProfile.jsx";

const ProductPage = () => {
  const [allProduct, setAllProduct] = useState([]);

  const formikProduct = useFormik({
    initialValues: {
      titleProduct: "",
      text: "",
      price: "",
      category: "",
      preText: "",
      pageDesc: "",
    },
    validationSchema: Yup.object({
      titleProduct: Yup.string().required(
        'Поле "Название продукта" обязательно для заполнения'
      ),
      text: Yup.string().required('Поле "Текст" обязательно для заполнения'),
      price: Yup.number().required('Поле "Цена" обязательно для заполнения'),
      category: Yup.string().required(
        'Поле "Категория" обязательно для заполнения'
      ),
      preText: Yup.string().required(
        'Поле "Краткое описание" обязательно для заполнения'
      ),
      pageDesc: Yup.string().required(
        'Поле "Описание страницы" обязательно для заполнения'
      ),
    }),
    onSubmit: (item) => {
      console.log(item);
    },
  });

  const getAllProduct = async () => {
    try {
      await api
        .get("/api/products/all")
        .then((response) => {
          setAllProduct(response.data.product);
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.log("Ошибка", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const itemsTabs = [
    {
      key: "1",
      label: "Все товары",
      children: (
        <div className={style.product__admin__block}>
          {allProduct.map((obj, index) => (
            <AdminProductItem key={index} {...obj} />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Добавление товара",
      children: (
        <div>
          <form
            className={style.form__add}
            onSubmit={formikProduct.handleSubmit}
          >
            <div className={style.form__block__input}>
              <p>Введите название товара:</p>
              <InputProfile
                id="titleProduct"
                name="titleProduct"
                typeInput={"text"}
                value={formikProduct.values.titleProduct}
                onChange={formikProduct.handleChange}
                placeholder={"Денежный бокс"}
                errorChange={formikProduct.errors.titleProduct && "true"}
              />
            </div>
            <div className={style.form__block__input}>
              <p>Введите полное описание товара:</p>
              <textarea 
                id="text"
                name="text"
                value={formikProduct.values.text}
                onChange={formikProduct.handleChange}
                placeholder={"Этот бокс содержит в себе..."}
                className={formikProduct.errors.text ? style.block__input__error : style.block__input}
              ></textarea>
            </div>
            <div className={style.form__block__input}>
              <p>Введите цену товара (BYN):</p>
              <InputProfile
                id="price"
                name="price"
                typeInput={"text"}
                value={formikProduct.values.price}
                onChange={formikProduct.handleChange}
                placeholder={"1000 BYN"}
                errorChange={formikProduct.errors.price && "true"}
              />
            </div>
            <div className={style.form__block__input}>
              <p>Введите категорию товара:</p>
              <InputProfile
                id="category"
                name="category"
                typeInput={"text"}
                value={formikProduct.values.category}
                onChange={formikProduct.handleChange}
                placeholder={"На 23 февраля"}
                errorChange={formikProduct.errors.category && "true"}
              />
            </div>
            <div className={style.form__block__input}>
              <p>Введите текст для карточки товара:</p>
              <textarea 
                id="preText"
                name="preText"
                value={formikProduct.values.preText}
                onChange={formikProduct.handleChange}
                placeholder={"Это самый..."}
                className={formikProduct.errors.preText ? style.block__input__error : style.block__input}
              ></textarea>
            </div>
            <div className={style.form__block__buttons}>
              <button>Выбрать основное фото</button>
              <button>Выбрать фото</button>
            </div>
            <div className={style.form__block__input}>
              <p>Введите описание для страницы описания товара:</p>
              <textarea 
                id="pageDesc"
                name="pageDesc"
                value={formikProduct.values.pageDesc}
                onChange={formikProduct.handleChange}
                placeholder={"Данный продукт является...."}
                className={formikProduct.errors.pageDesc ? style.block__input__error : style.block__input}
              ></textarea>
            </div>

            <button className={style.form__buttons}>
              Добавить новый товар
            </button>
          </form>
          <div>
            <img src="" alt="" />

            <div></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={style.block__product}>
      <Tabs defaultActiveKey="1" items={itemsTabs}></Tabs>
    </div>
  );
};

export default ProductPage;
