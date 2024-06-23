import {Router} from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwtToken from 'jsonwebtoken'
import verifyToken from '../validation/verifyToken.js'
import { registerValidation, loginValidation } from './../validation/auth.js'
import iconv from 'iconv-lite'
import path from 'path'
import crypto from 'crypto'

import Box from '../models/Box.js'
import Category from '../models/Category.js'
import Order from '../models/Order.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/product");
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
          const encodedFilename = iconv.encode(raw.toString('hex') + Date.now() + path.extname(file.originalname), 'win1251');
          const filename = encodedFilename.toString();
          cb(null, filename);
          slider.push(`https://korobka-production-65a0.up.railway.app/product/${filename}`);
      });
  }
});

let slider = [];
const upload = multer({ storage: storage });
const adminRoute = Router();

const allMonths = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь"
};

function getRandomShadeOfBlue() {
  const min = 150;
  const max = 220;
  const r = 0;
  const g = 0;
  const b = Math.floor(Math.random() * (max - min) + min);

  return `rgb(${r},${g},${b})`;
}

function getRandomShadeOfOrangeRed() {
  const min = 200; // минимальное значение для оттенка оранжевого или красного
  const max = 255; // максимальное значение для оттенка оранжевого или красного
  const r = Math.floor(Math.random() * (max - min) + min); // генерируем красный оттенок
  const g = Math.floor(Math.random() * (min - 50) + 50); // зеленый оттенок (менее яркий)
  const b = Math.floor(Math.random() * (min - 30) + 30); // синий оттенок (еще более темный) 

  return `rgb(${r},${g},${b})`;
}
  
adminRoute.post('/add', verifyToken, upload.any(), async (req, res) => {
  try {

    const box = {
      img: slider[0],
      ...req.body
    }

    const newBox = new Box(box);
    newBox.save();

    slider = []

    res.status(202).json({
        message: "Товар успешно добавлен",
        newProduct: newBox
    })

  } catch (error) {
    slider = []
    res.status(500).json({
      message: "Не удалось добавить товар. Пожалуйста, попробуйте еще раз."
    });
  }
});

adminRoute.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await Box.findByIdAndDelete(id)

    if(deleteProduct) {
      res.status(202).json({
        message: "Товар успешно удален из БД"
      })
    } else {
      res.status(500).json({
        message: "Не удалось удалить товар"
      })
    }

  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить товар из БД"
    });
  }
});

adminRoute.get("/stat/category", async (req, res) => {
  try {
  
    const categories = await Category.find({});

    const data = await Promise.all(categories.map(async (category) => {
      const categoryBoxes = await Box.find({ category: { $in: [category._id] } });
      const categoryName = category.value;
      const boxesCount = categoryBoxes.length;
    
      return {
        x: categoryName,
        y: boxesCount,
        color: getRandomShadeOfBlue()
      };
    }));
    
    res.status(200).json(data)

  } catch (error) {
    console.log(error.message);
  }
});

adminRoute.get("/stat/order", async (req, res) => {
  try {
  
    const orderAll = await Order.find({ 
      createdOrder: { $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) } 
    });

    let totalSum = 0;

    orderAll.forEach(order => {
        totalSum += order.totalAmount;
    });

    function formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'RUB' }).format(amount).replace('RUB', '');;
    }

    const ordersByMonth = {};
    orderAll.forEach(order => {
        const month = new Date(order.createdOrder).getMonth();
        if (ordersByMonth[month]) {
            ordersByMonth[month]++;
        } else {
            ordersByMonth[month] = 1;
        }
    });
    
    const data = Object.keys(allMonths).map(month => ({
        x: allMonths[month],
        y: ordersByMonth[parseInt(month)] || 0,
        color: getRandomShadeOfOrangeRed()
    }));
    
    res.status(200).json({order: data, totalPrice: formatCurrency(totalSum)})
    totalSum = 0

  } catch (error) {
    console.log(error.message);
  }
});



export default adminRoute