import { useContext, useState } from "react";
import debounce from "debounce";
import { AuthContext } from "../../context/authContext.js";

import style from './counterInput.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartItemAsync, deleteCartItemAsync, increaseCartItemAsync, updateCountItemAsync } from "../../store/cartSlice.js";

// eslint-disable-next-line react/prop-types
const CounterInput = ({ counts, setCounts, _id }) => {
    const [input, setInput] = useState(false);
    const { openNotification, openNotificationError } = useContext(AuthContext);
    const dispatch = useDispatch()

    const subtractProduct = async () => {
      if (counts <= 1) {
        dispatch(deleteCartItemAsync(_id))
                .then(() => {
                  openNotification("bottomRight", "Товар удален из корзины")
                })
      } else {
        const resultIncrease = dispatch(decreaseCartItemAsync(_id));
        if (resultIncrease) {
          setCounts(counts - 1);
        }
      }
    };

    const debouncedHandleChange = debounce((_id, count) => {
        dispatch(updateCountItemAsync({id:_id, count}))
                .then(() => {
                  setCounts(count)
                })
                .catch(() => {
                  const errorMessage = localStorage.getItem('errorMessage')
                  setCounts(counts)
                  openNotificationError("bottomRight", errorMessage)
                  localStorage.removeItem('errorMessage')
                })
    }, 1000);

    const handleChange = (e) => {
      if (e.target.value > 200) {
        setCounts(200);
      } else {
        setCounts(Number(e.target.value));
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
      if (counts >= 200) {
        setCounts(counts);
      } else {
        dispatch(increaseCartItemAsync({_id: _id, countProduct: counts}))
                    .then(result => {
                        if(result.payload.increase) { 
                          setCounts(counts + 1)
                            openNotification('bottomRight', 'Количество товара увеличено');
                        }
                    })
                    .catch(() => {
                        setCounts(counts)
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
                <input className={style.count_input} type="text" value={counts} onChange={handleChange} onBlur={onBlurInput}/>
                :
                <p className={style.count} onClick={changeOnInput}>{counts}</p>
            }
            <button className={style.btn_counter} onClick={addProduct}>
                <img className={style.counter_icon} src="/assets/btn-cart-plus.svg" alt="" />
            </button>
        </div>
     );
}
 
export default CounterInput;