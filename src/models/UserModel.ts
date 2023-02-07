import mongoose from "mongoose";
import encryptPassword from "../utils/encryptPassword";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Number, required: true },
  updated_at: { type: Number, required: true },
});

UserSchema.pre("save", async function () {
  const passwordHash = await encryptPassword(this.password);
  this.password = passwordHash;
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
