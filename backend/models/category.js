const { Schema, model } = require("mongoose");
 

const CategorySchema = Schema({
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
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  subCategory: [{
    type: Schema.Types.ObjectId,
    ref: "subCategory"
  }]
});

CategorySchema.methods.toJSON = function () {
  const { __v, status, ...category } = this.toObject();
 
  return category;
};

module.exports = model("Category", CategorySchema);
