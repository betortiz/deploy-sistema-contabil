import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Nome é obrigatório" });
    }
    if (!email) {
      return res.send({ message: "Email é obrigatório" });
    }
    if (!password) {
      return res.send({ message: "Senha é obrigatório" });
    }
    if (!phone) {
      return res.send({ message: "Telefone é obrigatório" });
    }
    if (!address) {
      return res.send({ message: "Endereço é obrigatório" });
    }
    if (!answer) {
      return res.send({ message: "Resposta é obrigatório" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Já é cadastrado, faça o login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "Usuário registrado com sucesso",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro ao registrar usuário",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email) {
      return res.status(404).send({
        message: "Email é obrigatório",
      });
    }
    if (!password) {
      return res.status(404).send({
        message: "Senha é obrigatório",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email ou senha errada",
      });
    }
    //check password
    const isMatch = await comparePassword(password, user.password);
    //validation
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Email ou senha errada",
      });
    }
    //create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro ao realizar login",
      error,
    });
  }
};

// Forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      return res.status(404).send({
        message: "Email é obrigatório",
      });
    }
    if (!answer) {
      return res.status(404).send({
        message: "Resposta é obrigatório",
      });
    }
    if (!newPassword) {
      return res.status(404).send({
        message: "Nova senha é obrigatório",
      });
    }

    //check user
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email ou resposta errada",
      });
    }
    //hash password
    const hashedPassword = await hashPassword(newPassword);
    //update password
    await userModel.findByIdAndUpdate(
      user._id,
      { password: hashedPassword }
    );
    res.status(200).send({
      success: true,
      message: "Senha atualizada com sucesso",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro ao realizar login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
