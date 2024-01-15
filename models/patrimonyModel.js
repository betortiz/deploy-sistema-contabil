import mongoose from "mongoose";

const patrimonySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  divBruno: {
    type: Number,
    default: 0,
  },
  divAna: {
    type: Number,
    default: 0,
  },
  nota: {
    type: Number,
    default: 0,
  },
  dtNota: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "Não informado",
  },
  financiado: {
    type: String,
  },
  vTotal: {
    type: Number,
    default: 0,

  },
  vPago: {
    type: Number,
    default: 0,
  },
  vAPagar: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Patrimony", patrimonySchema);
