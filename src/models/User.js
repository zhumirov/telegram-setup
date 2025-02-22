import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    chatId: { type: String, index: true },
    userId: { type: String },
    tgUsername: { type: String },
    interfaceLanguage: { type: String, default: "English" },
    channelMembership: { type: Boolean, default: false },
    referralSource: { type: String, default: "none" },
    scenario: { 
      value: { type: String, default: "regular" },
      priority: { type: Number, default: 0 }
    },
    blockedUntil: { type: Date, default: null },
    messageCount: { 
      date: { type: Date, default: null },
      count: { type: Number, default: 0 }
    }
});

const User = mongoose.model("User", userSchema);
export default User;