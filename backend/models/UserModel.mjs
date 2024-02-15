import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
  },
  password: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
});

const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
