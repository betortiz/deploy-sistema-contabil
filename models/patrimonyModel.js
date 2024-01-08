import mongoose, { mongo } from "mongoose";

const patrimonySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dtNota: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  nota: {
    type: Number,
    required: true,
  },
  fornecedor: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Patrimony", patrimonySchema);
