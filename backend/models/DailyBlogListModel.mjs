import mongoose from "mongoose";

const DailyBlogListSchema = mongoose.Schema({
  dailyBlogYear: {
    type: String,
    required: true,
    index: true,
  },
  listOfDates: { type: Array, default: [] },
});

const DailyBlogList = mongoose.model("DailyBlogList", DailyBlogListSchema);
export default DailyBlogList;
