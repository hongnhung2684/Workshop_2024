import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Joi from "joi";
import {StatusCodes} from "http-status-codes";
import {SMTPClient} from "emailjs";
const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu ko khớp",
  })
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})
export const signup = async (req, res) => {
  try {
    // Validate request body
    const {error} = signupSchema.validate(req.body);
    if(error){
      return res.status(StatusCodes)
    }
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }
    // Kiểm tra xem có người dùng nào trong hệ thống chưa
    const userCount = await User.countDocuments({});
    // Nếu không có người dùng nào, đặt vai trò là admin, ngược lại là customer
    const role = userCount === 0 ? "admin" : "customer";
    // Tạo người dùng mới
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Register failed" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    // nếu ko tìm thấy người dùng trả về lỗi
    if (!user) {
      return res.status(400).json({ message: "Email hoặc mật khẩu ko đúng" });
    }
    // Kiểm tra mật khẩu
    const isMatch = await user.comparePassword(password);
    // nếu mật khẩu ko đúng trả về lỗi
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }
    // Tạo token JWT
    const token = jwt.sign({ _id: user._id }, import.meta.env.JWT_SECRET, {
      expiresIn: "1h",
      
    });
    // Trả về token và thông tin người dùng
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
