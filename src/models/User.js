const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: false },
  accountNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: false },
  registrationNumber: { type: String, required: true, unique: true }
}, { timestamps: true });

userSchema.index({ accountNumber: 1 });
userSchema.index({ registrationNumber: 1 });

module.exports = mongoose.model('User', userSchema);
