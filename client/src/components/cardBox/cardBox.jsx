import { useContext, useEffect, useState } from "react";
import style from "./cardBox.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/authContext";
import {
  addBoxTypeGift,
  addProductGift,
  addPostCardGift,
  incBoxTypeGift,
  incProductGift,
  incPostCardGift,
  decBoxTypeGift,
  decProductGift,
  decPostCardGift,
  delBoxTypeGift,
  delProductGift,
  delPostCardGift,
} from "../../store/prefabricatedGiftSlice";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// eslint-disable-next-line react/prop-types
const CardBox = ({ obj, type }) => {
  const { _id, photo, title, price } = obj;
  const typesBox = useSelector((state) => state.prefabricatedGift.typesBox);
  const product = useSelector((state) => state.prefabricatedGift.product);
  const postcards = useSelector((state) => state.prefabricatedGift.postcards);
  const [isAdded, setIsAdded] = useState(false);
  const [countProduct, setCountProduct] = useState(0);
  const dispatch = useDispatch();
  const { openNotification } = useContext(AuthContext);

  useEffect(() => {
    if (type === "boxTypes") {
      const foundBox = typesBox.find(box => box._id === _id);
      if (foundBox === undefined) {
        setCountProduct(0);
        setIsAdded(false)
      } else {
        setCountProduct(foundBox.count);
        setIsAdded(true)
      }
    }
  }, [typesBox]);

  useEffect(() => {
    if (type === "product") {
      const foundBox = product.find(box => box._id === _id);
      if (foundBox === undefined) {
        setCountProduct(0);
        setIsAdded(false)
      } else {
        setCountProduct(foundBox.count);
        setIsAdded(true)
      }
    }
  }, [product]);

  useEffect(() => {
    if (type === "postCard") {
      const foundBox = postcards.find(box => box._id === _id);
      if (foundBox === undefined) {
        setCountProduct(0);
        setIsAdded(false)
      } else {
        setCountProduct(foundBox.count);
        setIsAdded(true)
      }
    }
  }, [postcards]);


  const subtractProduct = () => {
    if (countProduct <= 1) {
      if (type === "boxTypes") {
        handleDelItem(delBoxTypeGift)
        openNotification("bottomRight", "Коробка удалена")
        setCountProduct(0)
        setIsAdded(false)
      }
  
      if (type === "product") {
        handleDelItem(delProductGift)
        openNotification("bottomRight", "Продукт удален")
        setCountProduct(0)
        setIsAdded(false)
      }
  
      if (type === "postCard") {
        handleDelItem(delPostCardGift)
        openNotification("bottomRight", "Открытка удалена")
        setCountProduct(0)
        setIsAdded(false)
      }

    } else {
      if (type === "boxTypes") {
        handleAddDec(decBoxTypeGift);
        setCountProduct(countProduct - 1)
      }
  
      if (type === "product") {
        handleAddDec(decProductGift);
        setCountProduct(countProduct - 1)
      }
  
      if (type === "postCard") {
        handleAddDec(decPostCardGift);
        setCountProduct(countProduct - 1)
      }
    }
  };

  const handleAddItems = (findType, addAction, notificationMessage) => {
    setIsAdded(true);
    dispatch(addAction({ _id, photo, title, price, count: countProduct + 1 }));

    const typeFind = findType.find((obj) => obj._id === _id);

    if (!typeFind) {
      setCountProduct(1);
    } else {
      setCountProduct(typeFind.count + 1);
    }

    setIsAdded(true);
    openNotification("bottomRight", notificationMessage);
  };

  const handleAddInc = (incAction) => {
    dispatch(incAction(_id));
    setCountProduct(countProduct + 1);
  };

  const handleDelItem = (incAction) => {
    dispatch(incAction(_id));
  };

  const handleAddDec = (decAction) => {
    if (countProduct <= 1) {
      setIsAdded(false);
      // dispatch(deleteCartItemAsync(_id))
      //         .then(() => {
      //             setIsAdded(false)
      //         })
    } else {
      setCountProduct(countProduct - 1);
      dispatch(decAction(_id));
    }
  };

  const clickBtnAdd = async () => {
    setIsAdded(true);

    if (type === "boxTypes") {
      handleAddItems(typesBox, addBoxTypeGift, "Коробка успешно добавлена");
    }

    if (type === "product") {
      handleAddItems(product, addProductGift, "Товар успешно добавлен");
    }

    if (type === "postCard") {
      handleAddItems(postcards, addPostCardGift, "Открытка успешно добавлена");
    }
  };

  const addProduct = () => {
    if (countProduct >= 200) {
      setCountProduct(countProduct);
    } else {
      if (type === "boxTypes") {
        handleAddInc(incBoxTypeGift);
      }

      if (type === "product") {
        handleAddInc(incProductGift);
      }

      if (type === "postCard") {
        handleAddInc(incPostCardGift);
      }
    }
  };

  return (
    <div className={style.main__type_block}>
      <div className={style.main__type_image}>
        <a data-fancybox="gallery" href={photo}>
          <img src={photo} alt="Photo" />
        </a>
      </div>
      <h2 className={style.main__type_title}>{title}</h2>
      <p className={style.main__type_price}>Цена: {price} BYN</p>
      <div className={style.button__add_cart}>
        {isAdded ? (
          <div className={style.counter__block}>
            <img
              className={style.counter__image}
              src="/assets/product-cart-decrease.svg"
              alt="Decrease"
              onClick={subtractProduct}
            />
            <div className={style.counter__info}>
              <p className={style.counter__count}>{countProduct} шт.</p>
            </div>
            <img
              className={style.counter__image}
              src="/assets/product-cart-increase.svg"
              alt="Increase"
              onClick={addProduct}
            />
          </div>
        ) : (
          <button className={style.main__type_button} onClick={clickBtnAdd}>
            <p>Добавить</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardBox;
