import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwtToken from "jsonwebtoken";
import { registerValidation, loginValidation } from "../validation/auth.js";
import verifyToken from "../validation/verifyToken.js";
import multer from "multer";

import User from "../models/User.js";

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
    .populate("order")
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
    .then((item) => {
      console.log(item)
      res.status(201).json(item);
    })
    .catch((error) => console.log(error));
});

userRoute.patch( "/upload-image", verifyToken, upload.single("image"), async (req, res) => {
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

    if (body.email) {
      const email = await User.findOne({ email: body.email });
      email
        ? res.status(409).json({ message: "Такая почта уже существует" })
        : await User.updateOne({ _id: userId }, body, { new: true })
            .then(() => {
              res.status(201).json({
                message: "Данные успешно сохранены",
              });
            })
            .catch((error) =>
              res.status(400).json({ message: "Ошибка сохранения данных" })
            );
    }
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

export default userRoute;
