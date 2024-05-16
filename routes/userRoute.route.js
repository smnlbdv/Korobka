import { Router } from "express";
import bcrypt from "bcryptjs";
import verifyToken from "../validation/verifyToken.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import jwt from 'jsonwebtoken';
import { generationToken, saveToken } from '../utils/generationJwt.js'
import dotev from 'dotenv'
dotev.config()

import pdfGenerate from "../utils/pdfGenerate.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Token from "../models/Token.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const userRoute = Router();

userRoute.get("/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  await User.findOne({ _id: userId })
    .populate({
      path: "favorite",
      populate: {
        path: "items"
      },
    })
    .populate({
      path: "cart",
      populate: {
        path: "items",
        populate: {
          path: "product",
        },
      },
    })
    .populate({
      path: "email"
    })
    .populate({
      path: "order",
      populate: {
          path: "items.productId"
      }
    })
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((error) => console.log(error));
});

userRoute.patch("/upload-image", verifyToken, upload.single("image"), async (req, res) => {
    try {
      const userId = req.userId;
      const url = `http://localhost:5000/avatar/${req.file.originalname}`;

      await User.findByIdAndUpdate(
        { _id: userId },
        { avatarUser: url },
        { new: true }
      )
        .then(() => {
          res.status(201).json({
            message: "Фото успешно сохранено",
            url: url,
          });
        })
        .catch((error) =>
          res.status(400).json({ message: "Ошибка сохранения данных" })
        );
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

userRoute.patch("/update", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const body = req.body;

    await User.updateOne({ _id: userId }, body, { new: true })
            .then(() => {
              res.status(200).json({
                message: "Данные успешно сохранены",
              });
            })
            .catch((error) =>
              res.status(400).json({ message: "Ошибка сохранения данных" })
            );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

userRoute.patch("/:id/password", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;
    const user = await User.findOne({ _id: userId });

    if (user) {
      const isMatch = await bcrypt.compare(body.prepassword, user.passwordHash);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Старый пароль неверный", resultPass: false });
      } else {
        user.passwordHash = await bcrypt.hash(body.confirmPassword, 12);
        await user.save();
        res.status(201).json({
          message: "Данные успешно сохранены",
          resultPass: true,
        });
      }
    } else {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

userRoute.post("/order", verifyToken, async (req, res) => {
  const userId = req.userId;
  const body = req.body;

  let newOrder = {
    owner: userId,
    totalAmount: body.totalAmount,
    address: body.order.address,
    wayPay: body.order.wayPay
  }

  newOrder.items = body.cart.map(item => ({
    productId: item._id,
    quantity: item.count
  }))

  const order = new Order(newOrder);
  order.save()
    .then(async (savedOrder) => {
        if (savedOrder) {
            const user = await User.findById(userId);
            if (user) {
                user.order.push(savedOrder._id.toString());
                await user.save();

                const save = await savedOrder.populate('items.productId')                
                pdfGenerate(save, order._id)
                          .then((data) => {
                            if(data.result) {
                              res.status(200).json({ message: 'Заказ оформлен', success: true, order: save, url: data.url });
                            }
                          })
                          .catch((error) => {
                              res.status(400).json({ message: 'Ошибка формирования чека' });
                          });
            } else {
              res.status(404).json({ message: 'Пользователь не найден' });
            }
        } else {
            res.status(500).json({ message: 'Не удалось сохранить заказ' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Произошла ошибка при сохранении заказа', error: err });
    });
  
});

userRoute.delete("/delete-order/:orderId", verifyToken, async (req, res) => {
  const orderId = req.params.orderId
  const userId = req.userId
  try {
    const response = await User.updateOne({ _id: userId }, { $pull: { order: orderId } });
    const responseOrder = await Order.deleteOne({ _id: orderId });
    if(response.acknowledged && responseOrder.acknowledged) {
      res.status(200).json({ message: "Заказ успешно удален", success: true });
    }
    else {
      res.status(400).json({ message: "Ошибка удаления111", success: false });
    }
  } catch (error) {
      res.status(400).json({message: "Ошибка удаления", delete: error.acknowledged });
  }
})

userRoute.get("/order/:orderId/check", verifyToken, async (req, res) => {
  const currentDir = process.cwd();
  const orderId = req.params.orderId;
  const pdfFilePath = path.join(currentDir, '../public', `check-${orderId}.pdf`);

  try {
    if (fs.existsSync(pdfFilePath)) {
      res.status(200).json({ message: "PDF файл уже существует", url: `check-${orderId}.pdf`});
    } else {
      const save = await Order.findById(orderId).populate('items.productId')
      pdfGenerate(save, orderId)
        .then((data) => {
          if(data.result) {
            res.status(200).json({ message: 'Чек сформирован', url: data.url });
          }
        })
        .catch((error) => {
            res.status(400).json({ message: 'Ошибка формирования чека', url: null});
        });
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(400).json({ message: "Ошибка при создании PDF файла", success: false });
  }
})

// userRoute.post("/logout", async (req, res) => {
//   try {
//     const { refreshToken } = req.cookies;
//     console.log(refreshToken);
//     // const token = await removeToken(refreshToken)
//     // res.clearCookie("refreshToken")
//     // res.status(200).json({message: "Вы разлогинились", token: token});
//   } catch (error) {
//     console.error('Произошла ошибка:', error);
//     res.status(400).json({ message: "Ошибка при разлогировании" });
//   }
// })

userRoute.get("/activate/:link", verifyToken, async (req, res) => {
  try {
    const link = req.params.link;
    const user = await User.findOne({activationLink: link});

    if(!user) {
      res.status(400).json({ message: "Некорректная ссылка активации" })
    }

    user.isActivated = true;
    user.activationLink = null;
    await user.save();

    res.status(200).json({ message: "Аккаунт успешно загеристрирован" }).redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(400).json({ message: "Ошибка при активации" });
  }
})

userRoute.get("/token/refresh", async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken

    const userData = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET)
    const tokenData = await Token.findOne({refreshToken: refresh_token})

    if(!userData || !tokenData) {
      res.status(401).json({ message: "Не авторизованный пользователь"})
    }

    const user = await User.findById(userData.userId).populate("email")

    const tokens = generationToken({userId: user._id, email: user.email.email, isActivated: user.isActivated, role: user.role})
    await saveToken(user._id, tokens.refreshToken)

    res.cookie("refreshToken", tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json({
        message: "Авторизация прошла успешно",
        accessToken: tokens.accessToken,
        user: {
            id: user._id,
            email: user.email,
            isActivated: user.isActivated,
            role: user.role
        }
    });

  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(401).json({ message: "Ошибка авторизации" });
  }
})

export default userRoute;
