import mongoose from "mongoose";

const DailyBlogSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      index: true,
    },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const DailyBlog = mongoose.model("DailyBlog", DailyBlogSchema);
export default DailyBlog;
