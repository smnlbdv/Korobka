
import { Tabs, Select, Modal } from "antd";
const { Option } = Select;

import style from "./orders.module.scss";

import { AdminContext } from "../../context/adminContext.js";
import { useContext, useState } from "react";
import ProfileOrderItem from "../../components/profileOrderItem/profileOrderItem.jsx";
import ModalProfileItem from "../../components/modalProdileItem/modalProfileItem.jsx";
import api from "../../api/api.js";

const Orders = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedItems, setSelectedItems] = useState([]); 
  const [orderId, setOrderId] = useState()
  const { allOrders, allStatus, contextHolder, contextHolderEmail, success } = useContext(AdminContext);

  const showModal = (_id) => {
    setOrderId(_id)
    setIsModalOpen(true);
    
    allOrders.forEach((orderItem) => {
      if(String(orderItem._id) === String(_id)) {
        setSelectedItems([...orderItem.items]);
      }
    })
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const itemsTabs = [
    {
      key: "1",
      label: "Все заказы",
      children: (
        <div className={style.product__admin__block}>
            {allOrders.slice().reverse().map((obj, index) => (
                <ProfileOrderItem
                    key={obj._id}
                    groupImage={obj.items}
                    {...obj}
                    onClick={showModal}
                />
            ))}
        </div>
      ),
    }
  ];

  const handleChange = async (value) => {
    try {
        await api.patch(`/api/admin/orders/update/${orderId}`, {status: value})
          .then((response) => {
            success("Статус успешно изменен")
          })
          .catch((error) => alert(error.message));
    } catch (error) {
        console.log("Ошибка", error);
    }
  };

  return (
    <div className={style.block__product}>
      {contextHolder}
      {contextHolderEmail}
      <Tabs defaultActiveKey="1" items={itemsTabs}></Tabs>
      <Modal
          title="Товары заказа"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={950}
          footer={null}
          className="profile-ant"
        >
          <Select
              defaultValue="Новый"
              style={{ width: 20, height: 26 }}
              onChange={handleChange}
          >
            {allStatus.map((option) => (
              <Option key={option.value} value={option.value} style={{ color: option.color }}>
                {option.label}
              </Option>
            ))}
          </Select>
          {selectedItems && selectedItems.map((item, index) => (
                <ModalProfileItem key={index} item={item}/>
          ))}
      </Modal>
    </div>
  );
};

export default Orders;
