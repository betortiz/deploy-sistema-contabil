import patrimonyModel from "../models/patrimonyModel.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createPatrimonyController = async (req, res) => {
  try {
    const { description, brand, model, year, category, price, dtNota, nota, fornecedor } = req.fields;

    //alidation
    switch (true) {
      case !description:
        return res.status(500).send({ error: "Descrição é obrigatório" });
      case !price:
        return res.status(500).send({ error: "O preço é obrigatório" });
      case !category:
        return res.status(500).send({ error: "Categoria é obrigatório" });
      case !brand:
        return res.status(500).send({ error: "A marca é obrigatório" });
      case !model:
        return res.status(500).send({ error: "O modelo é obrigatório" });
      case !year:
        return res.status(500).send({ error: "O ano é obrigatório" });
      case !dtNota:
        return res.status(500).send({ error: "A data da nota é obrigatório" });
      case !nota:
        return res.status(500).send({ error: "O número da nota é obrigatório" });
      case !fornecedor:
        return res.status(500).send({ error: "O fornecedor é obrigatório" });
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

//get all products
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

// get single product
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

//delete controller
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

//update producta
export const updatePatrimonyController = async (req, res) => {
  try {
    const { description, brand, model, year, category, price, dtNota, nota, fornecedor } = req.fields;

    //alidation
    switch (true) {
      case !description:
        return res.status(500).send({ error: "Descrição é obrigatório" });
      case !price:
        return res.status(500).send({ error: "O preço é obrigatório" });
      case !category:
        return res.status(500).send({ error: "Categoria é obrigatório" });
      case !brand:
        return res.status(500).send({ error: "A marca é obrigatório" });
      case !model:
        return res.status(500).send({ error: "O modelo é obrigatório" });
      case !year:
        return res.status(500).send({ error: "O ano é obrigatório" });
      case !dtNota:
        return res.status(500).send({ error: "A data da nota é obrigatório" });
      case !nota:
        return res.status(500).send({ error: "O número da nota é obrigatório" });
      case !fornecedor:
        return res.status(500).send({ error: "O fornecedor é obrigatório" });
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

// filters
export const patrimonyFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const patrimony = await patrimonyModel.find(args);
    res.status(200).send({
      success: true,
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Erro ao filtrar patrimonios",
      error,
    });
  }
};

// product count
export const patrimonyCountController = async (req, res) => {
  try {
    const total = await patrimonyModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const patrimonyListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const patrimony = await patrimonyModel
      .find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchPatrimonyController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await patrimonyModel
    // buscar por qualquer item
      .find({
        $or: [
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedPatrimonyController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const patrimony = await patrimonyModel
      .find({
        category: cid,        
        _id: { $ne: pid },
      })
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const patrimonyCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const patrimony = await patrimonyModel
      .find({ category })
      .populate("category");
    res.status(200).send({
      success: true,
      category,
      patrimony,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Erro ao listar patrimonios por categoria",
    });
  }
};
