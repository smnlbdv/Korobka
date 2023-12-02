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
          <h3 className={style.title_contact}>Фактический адрес</h3>
          <p className={style.text_contact}>
          660041, Россия, г. Красноярск, ул. Академика Киренского, д.89.
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Почтовый адрес</h3>
          <p className={style.text_contact}>
          660130, Красноярский край, г. Красноярск а/я 20493
          </p>
        </div>
        <div className={style.item_block_contacts}>
          <h3 className={style.title_contact}>Реквизиты организации</h3>
          <p className={style.text_contact}>
            Общество с ограниченной ответственностью «Наш Двор Сибирь»
          </p>
          <p className={style.text_contact}>
            ИНН/КПП: 2463108622/246301001
          </p>
          <p className={style.text_contact}>
            ОГРН: 1172468031097
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
