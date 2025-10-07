import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  password: {
    type: String, 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  }
});

const VaultItem = mongoose.models.VaultItem || mongoose.model("VaultItem", vaultSchema);
export default VaultItem;
