import patrimonyModel from "../models/patrimonyModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// create patrimony
export const createPatrimonyController = async (req, res) => {
  try {
    const {
      category,
      description,
      divAna,
      divBruno,
      nota,
      dtNota,
      location,
      financiado,
      vTotal,
      vPago,
      vAPagar,
    } = req.fields;

    //Validation
    switch (true) {
      case !description:
        return res.status(500).send({ error: "Descrição é obrigatório" });
      case !vTotal:
        return res.status(500).send({ error: "O valor toral é obrigatório" });
      case !category:
        return res.status(500).send({ error: "Categoria é obrigatório" });
      case !nota:
        return res
          .status(500)
          .send({ error: "A numero da nota é obrigatório" });
      case !dtNota:
        return res.status(500).send({ error: "A data da nota é obrigatório" });
      case !financiado:
        return res.status(500).send({ error: "Financiador é obrigatório" });
    }

    const patrimony = new patrimonyModel({
      ...req.fields,
      slug: slugify(description),
    });

    await patrimony.save();
    res.status(201).send({
      success: true,
      message: "Patrimonio criado com sucesso",
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro ao criar patrimonio",
    });
  }
};

//get all patrimony
export const getPatrimonyController = async (req, res) => {
  try {
    const patrimony = await patrimonyModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      counTotal: patrimony.length,
      message: "Todos os patrimonios",
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro ao listar patrimonios",
      error: error.message,
    });
  }
};

// get single patrimony
export const getSinglePatrimonyController = async (req, res) => {
  try {
    const pId = req.params._id;
    const patrimony = await patrimonyModel.findById(pId).populate("category");
    res.status(200).send({
      success: true,
      message: "Patrimonio listado com sucesso",
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Erro ao listar patrimonio",
      error,
    });
  }
};

//delete patrimony
export const deletePatrimonyController = async (req, res) => {
  try {
    await patrimonyModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Patrimonio deletado com sucesso",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro ao deletar patrimonio",
      error,
    });
  }
};

//update patrimony
export const updatePatrimonyController = async (req, res) => {
  try {
    const {
      category,
      description,
      divAna,
      divBruno,
      nota,
      dtNota,
      location,
      financiado,
      vTotal,
      vPago,
      vAPagar,
    } = req.fields;

    //Validation
    switch (true) {
      case !description:
        return res.status(500).send({ error: "Descrição é obrigatório" });
      case !vTotal:
        return res.status(500).send({ error: "O valor toral é obrigatório" });
      case !category:
        return res.status(500).send({ error: "Categoria é obrigatório" });
      case !nota:
        return res
          .status(500)
          .send({ error: "A numero da nota é obrigatório" });
      case !dtNota:
        return res.status(500).send({ error: "A data da nota é obrigatório" });
      case !financiado:
        return res.status(500).send({ error: "Financiador é obrigatório" });
    }
    const patrimony = await patrimonyModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(description) },
      { new: true }
    );

    await patrimony.save();
    res.status(201).send({
      success: true,
      message: "Patrimonio atualizado com sucesso",
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro ao atualizar patrimonio",
    });
  }
};