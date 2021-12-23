const { Schema, model } = require("mongoose");

const ImagesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
    },
    product: {
      type: Schema.Types.ObjectID,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ImagesSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();

  return data;
};

module.exports = model("Image", ImagesSchema);
