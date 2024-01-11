import mongoose, { mongo } from "mongoose";

const patrimonySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
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
    required: true,
  },
  dtNota: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "Não informado",
    required: true,
  },
  financiado: {
    type: String,
    required: true,
  },
  vTotal: {
    type: Number,
    required: true,
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
