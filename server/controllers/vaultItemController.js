import VaultItem from "../models/VaultItem.js";
import jwt from 'jsonwebtoken'


// Add Vault Item
const addVaultItem = async (req, res) => {
  try {
    const { title, password, notes, username, url } = req.body;

    if (!title || !password) {
      return res.json({ success: false, message: "Required fields missing" });
    }

    const vaultItem = new VaultItem({
      userId: req.user._id, 
      title,
      password, 
      notes,
      username,
      url
    });

    await vaultItem.save();

    res.json({ success: true, message: "Vault item added successfully", vaultItem });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// List All Vault Items (for logged-in user)
const listVaultItem = async (req, res) => {
  try {
    const vaultItems = await VaultItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, vaultItems });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove Vault Item
const removeVaultItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.json({ success: false, message: "Vault item ID is required" });
    }

    const deletedItem = await VaultItem.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedItem) {
      return res.json({ success: false, message: "Vault item not found" });
    }

    res.json({ success: true, message: "Vault item removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Single Vault Item
const singleVaultItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ success: false, message: "Vault item ID is required" });
    }

    const vaultItem = await VaultItem.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!vaultItem) {
      return res.json({ success: false, message: "Vault item not found" });
    }

    res.json({ success: true, vaultItem });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update Vault Item
const updateVaultItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, password, notes, url, username } = req.body;

    const updatedItem = await VaultItem.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, password, notes, username, url },
      { new: true }
    );

    if (!updatedItem) {
      return res.json({ success: false, message: "Vault item not found or unauthorized" });
    }

    res.json({ success: true, message: "Vault item updated successfully", updatedItem });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addVaultItem, listVaultItem, removeVaultItem, singleVaultItem, updateVaultItem };
