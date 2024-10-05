import mongoose from "mongoose";
import slugify from "slugify";
import mongoosePaginate from "mongoose-paginate-v2";
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, unique: true },
    slug: { type: String, unique: true },
    price: { type: Number, required: true },
    image_url: { type: String, required: true },
    // attributes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Attribute",
    //     required: true,
    //   },
    // ],
    quantity: { type: Number, default: 1 },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    //
    tags: [String],
    sku: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Middleware để tự động tạo slug từ tên sản phẩm
ProductSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
// Thêm plugin mongoose-paginate-v2 để hỗ trợ phân trang
ProductSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", ProductSchema);
