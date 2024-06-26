const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: false },
  lastLoginDateTime: { type: Date, required: false, default: new Date() },
  userId: { type: String, required: true, unique: true, ref: 'User' }
}, { timestamps: true });

accountSchema.index({ lastLoginDateTime: 1 });

module.exports = mongoose.model('Account', accountSchema);
