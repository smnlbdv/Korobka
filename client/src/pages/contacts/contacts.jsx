/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import style from "./contacts.module.scss";

const Contacts = () => {
  return (
    <section className={`${style.section_contacts} wrapper`}>
      <ul className="bread-crumbs">
        <Link to="/">
          <li>Главная</li>
        </Link>
        <li>Контакты</li>
      </ul>
      <h2 className={`${style.section_title} section__title`}>Контакты</h2>
      <div className={style.block_contacts}>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Адрес производства</h3>
          <p className={style.text_contact}>
            623100, Свердловская обл., г.Первоуральск, Северо-восточная часть
            8-го квартала городских лесов МО «г.Первоуральск».
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Адрес производства</h3>
          <p className={style.text_contact}>
            623100, Свердловская обл., г.Первоуральск, Северо-восточная часть
            8-го квартала городских лесов МО «г.Первоуральск».
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Адрес производства</h3>
          <p className={style.text_contact}>
            623100, Свердловская обл., г.Первоуральск, Северо-восточная часть
            8-го квартала городских лесов МО «г.Первоуральск».
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Адрес производства</h3>
          <p className={style.text_contact}>
            623100, Свердловская обл., г.Первоуральск, Северо-восточная часть
            8-го квартала городских лесов МО «г.Первоуральск».
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Адрес производства</h3>
          <p className={style.text_contact}>
            623100, Свердловская обл., г.Первоуральск, Северо-восточная часть
            8-го квартала городских лесов МО «г.Первоуральск».
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Адрес производства</h3>
          <p className={style.text_contact}>
            623100, Свердловская обл., г.Первоуральск, Северо-восточная часть
            8-го квартала городских лесов МО «г.Первоуральск».
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
