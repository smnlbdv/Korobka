import { useState, useContext, useEffect } from "react";
import { Tabs, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import style from "./productPage.module.scss";
import api from "../../api/api.js";
import './ant.css'

import AdminProductItem from "../../components/adminProductItem/adminProductItem.jsx";
import InputProfile from "../../components/inputProfile/inputProfile.jsx";
import { AdminContext } from "../../context/adminContext.js";
import { AuthContext } from "../../context/authContext.js";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [pathImage, setPathImage] = useState('');
  const [selectedSlider, setSelectedSlider] = useState([]);
  const [pathSlider, setPathSlider] = useState([]);
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

    // if (formikProduct.errors.selectedOptions) {
    //   formikProduct.setValues({ selectedOptions: "true" });
    // } 

    // const labels = value.map(item => {
    //   const foundItem = categories.find(option => option.value === item);
    //   return foundItem ? foundItem._id : null;
    // });

    // setCategoryInput(...labels)
  };

  const handleSliderImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if(pathSlider.length < 4) {
      setPathSlider([...pathSlider, file]);
    }

    reader.onload = () => {
      if(selectedSlider.length < 4) {
        setSelectedSlider([...selectedSlider, reader.result]);
      }
    };

    reader.readAsDataURL(file);
  };

  const deleteSliderImage = (indexItem) => {
    const updatedArray = selectedSlider.filter((item, index) => index !== indexItem);
    setSelectedSlider([...updatedArray])
  }

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

      if(selectedImage.length == 0 && selectedSlider.length < 4) {
        countDown('error', 'Выберите фото для товара')
      } else if(selectedImage.length == 0) {
        countDown('error', 'Выберите пожалуйста основное фото товара')
      } else if(selectedSlider.length < 4) {
        countDown('error', `Выберите еще ${4 - selectedSlider.length} фото для слайдера`)
      } else if(categoryInput.length == 0) {

        const formData = new FormData();
        formData.append("image", pathImage);

        formData.append("category", categoryInput)

        pathSlider.forEach(image => {
          formData.append("sliderImages", image, image.name);
        });

        Object.keys(item).forEach(key => {
          formData.append(key, item[key]);
        });

        try {
          const token = JSON.parse(localStorage.getItem('userData')) || '';

          await api.post("/api/admin/add", formData, {
            headers: {
              'Authorization': `${token.token}`,
              'Content-Type': 'multipart/form-data',
            }})
            .then((response) => {
              if(response.status === 202) {
                resetForm();
                setSelectedImage('')
                setSelectedSlider([])
                setPathImage('')
                setPathSlider([])
                setCategoryInput([])
                setAllProduct((prev) => [...prev, response.data.newProduct])
                openNotification('bottomRight', 'Товар успешно добавлен БД');
              }
            })
            .catch((response) => 
              {
                if(response.response.status == 401) {
                  logout()
                  navigate("/api/auth/login");
                }
              }
            );
        } catch (error) {
          console.log("Ошибка", error);
        }
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
            <AdminProductItem key={index} {...obj} />
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Добавление бокса",
      children: (
        <div className={style.main__block_product}>
          <form
            className={style.form__add}
            onSubmit={formikProduct.handleSubmit}
          >
            <div className={style.form__block__input}>
              <p>Введите название товара:</p>
              <InputProfile
                id="title"
                name="title"
                typeInput={"text"}
                value={formikProduct.values.title}
                onChange={formikProduct.handleChange}
                placeholder={"Денежный бокс"}
                errorChange={formikProduct.errors.title && "true"}
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
              <div className={formikProduct.errors.selectedOptions ? style.block__input__error_2 : style.block__select}>
                <Select
                  mode="multiple"
                  placeholder="Мужской бокс"
                  onChange={handleChange}
                  options={options}
                />
              </div>
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
              <label htmlFor="mainImage">Выбрать основное фото</label>
              <input id="mainImage" name="mainImage" type="file" accept="image/*" onChange={handleImageChange} />
              <label htmlFor="slide-image">Выбрать фото</label>
              <input id="slide-image" name="slide-image" type="file" accept="image/*" onChange={handleSliderImage} />
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

            <button type="submit" className={style.form__buttons}>
              Добавить новый товар
            </button>
          </form>
          <div className={style.product__image}>
            <div className={style.block__rigth}>
              <img className={style.main__product__image} src={selectedImage} alt="" onDoubleClick={() => setSelectedImage(null)}/>
              <div className={style.slider__block}>
                {
                  selectedSlider.map((item, index) => (
                    <img key={index} src={item} alt="Slider image" onDoubleClick={() => deleteSliderImage(index)}/>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      ),
    },
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
