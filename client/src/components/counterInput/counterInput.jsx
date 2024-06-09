import { useContext, useState } from "react";
import debounce from "debounce";
import { AuthContext } from "../../context/authContext.js";

import style from './counterInput.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartItemAsync, deleteCartItemAsync, increaseCartItemAsync, updateCountItemAsync } from "../../store/cartSlice.js";

// eslint-disable-next-line react/prop-types
const CounterInput = ({ count, _id }) => {
    const [countNew, setCountNew] = useState(count)
    const [input, setInput] = useState(false);
    const { openNotification, openNotificationError } = useContext(AuthContext);
    const dispatch = useDispatch()

     const subtractProduct = async () => {
      if (countNew <= 1) {
        dispatch(deleteCartItemAsync(_id))
                .then(() => {
                  openNotification("bottomRight", "Товар удален из корзины")
                })
      } else {
        const resultIncrease = dispatch(decreaseCartItemAsync(_id));
        if (resultIncrease) {
          setCountNew(countNew - 1);
        }
      }
    };

    const debouncedHandleChange = debounce((_id, countInput) => {
      dispatch(updateCountItemAsync({id:_id, countInput: 200}))
      .then(() => {
        setCountNew(countInput)
        setInput(false)
      })
      .catch(() => {
        setCountNew(count)
        setInput(true)
        const errorMessage = localStorage.getItem('errorMessage')
        openNotificationError("bottomRight", errorMessage)
        localStorage.removeItem('errorMessage')
      })
    }, 1000);

    const handleChange = (e) => {
      if(e.target.value > 200) {
        setCountNew(200)
        debouncedHandleChange(_id, 200);
      } else {
        setCountNew(e.target.value)
        debouncedHandleChange(_id, Number(e.target.value));
      }
    };

    const changeOnInput = () => {
      setInput(true);
    };
  
    const onBlurInput = () => {
      setInput(false);
    };

    const addProduct = async () => {
      if (countNew >= 200) {
        setCountNew(countNew);
      } else {
        dispatch(increaseCartItemAsync({_id: _id, countProduct: countNew}))
                    .then(result => {
                        if(result.payload.increase) { 
                          setCountNew(countNew + 1)
                            openNotification('bottomRight', 'Количество товара увеличено');
                        }
                    })
                    .catch(() => {
                      setCountNew(countNew)
                        openNotificationError('bottomRight', 'Товара недостаточно на складе');
                    })
      }
    };

    return ( 
        <div className={style.counter__block}>
            <button className={style.btn_counter} onClick={subtractProduct}>
                <img className={style.counter_icon} src="/assets/btn-cart-minus.svg" alt="" />
            </button>
            {
                input ?
                <input className={style.count_input} type="text" value={countNew} onChange={handleChange} onBlur={onBlurInput}/>
                :
                <p className={style.count} onClick={changeOnInput}>{countNew}</p>
            }
            <button className={style.btn_counter} onClick={addProduct}>
                <img className={style.counter_icon} src="/assets/btn-cart-plus.svg" alt="" />
            </button>
        </div>
     );
}
 
export default CounterInput;