const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
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
    user: {
      type: Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectID,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectID,
      ref: "subCategory",
      required: true,
    },
    description: {
      type: String,
    },
    img: { type: String },
  },
  {
    timestamps: true,
  },
);

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();

  return data;
};

module.exports = model("Product", ProductSchema);
