import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true,
      uppercase: true,
    },

    action: {
      type: String,
      required: true,
      uppercase: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Permission ||
  mongoose.model("Permission", permissionSchema);