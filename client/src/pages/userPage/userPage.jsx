
import { Tabs, Select } from "antd";

import style from "./userPage.module.scss";
import './ant.css'

import { AdminContext } from "../../context/adminContext.js";
import { useContext } from "react";
import AdminUsers from "../../components/adminUsers/adminUsers.jsx";

const UserPage = () => {
  const { allUsers, contextHolder, contextHolderEmail} = useContext(AdminContext);

  const itemsTabs = [
    {
      key: "1",
      label: "Все пользователи",
      children: (
        <div className={style.product__admin__block}>
          {allUsers && allUsers.map((obj, index) => (
             <AdminUsers key={index} item={obj} />
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

export default UserPage;
