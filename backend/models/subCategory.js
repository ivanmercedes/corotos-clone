const { Schema, model } = require("mongoose");

const subCategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  slug: {
    type: String,
    required: [true, "El slug es obligatorio"],
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectID,
    ref: "Category",
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  }
});

subCategorySchema.methods.toJSON = function () {
  const { __v, status, ...subCategory } = this.toObject();

  return subCategory;
};
module.exports = model("subCategory", subCategorySchema);
