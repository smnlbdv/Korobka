
import { useContext, useEffect, useRef, useState } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import { Select, Space } from 'antd';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "./ant.css"
import style from './adminUsers.module.scss'
import { AdminContext } from '../../context/adminContext';
import api from '../../api/api';
import { AuthContext } from '../../context/authContext';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const AdminUsers = ({item}) => {

    const { allRoles, openNotification, contextHolder, deleteUser, success } = useContext(AdminContext)
    const [defaultRole, setDefaultRole] = useState()
    const role = useSelector(state => state.profile.role)

    useEffect(() => {
        const role = item.role.role;
          if (role === 0) {
            setDefaultRole("Пользователь");
          } else if (role === 1) {
            setDefaultRole("Администратор");
          } else if (role === 2) {
            setDefaultRole("Модератор");
          }
    }, [item]);

    const handleChange = async (value) => {
        try {
            await api.patch(`/api/admin/role/update/${item._id}`, {role: value})
              .then((response) => {
                success("Роль успешно изменена")
              })
              .catch((error) => alert(error.message));
        } catch (error) {
            console.log("Ошибка", error);
        }
    };
    
    return ( 
        <div className={style.main__block__modal}>
            <div className={style.modal__block__items}>
                <div className={style.modal__block__image}>
                    <img src={item.avatarUser} alt="" />
                </div>
                <div className={style.modal__block__description}>
                    <p className={style.modal__item__title}>
                        {item.name} {item.surname}
                    </p>
                    <p className={style.modal__item__quantity}>
                        Почта: {item.email.email}
                    </p>
                    <p className={style.modal__item__quantity}>
                        Телефон: {item.phone}
                    </p>
                </div>
                <div className={style.roles__block}>
                    {
                        role === 1 && 
                        <Select
                            defaultValue="Пользователь"
                            style={{ width: 20, height: 26 }}
                            onChange={handleChange}
                            options={allRoles}
                        />
                    }
                </div>
                {
                    item.isActivated ?
                    <p className={style.user__link_ok}>Подтвержден</p>
                    :
                    <p className={style.user__link_err}>Не подтвержден</p>
                }
                <button className={`${style.button} ${style.button__delete}`} onClick={() => deleteUser(item._id)}>
                        <img src="/assets/btn-cart-delete.svg" alt="Delete" />
                </button>
            </div>
        </div>
     );
}
 
export default AdminUsers;