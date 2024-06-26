const User = require('../models/User');
const AccountLogin = require('../models/Account');
const cache = require('../utils/memoization');
const KafkaProducer = require('../kafka/KafkaProducer');

class UserService {
    async createUser(userData) {
      const user = new User(userData);
      const accountLogin = new AccountLogin({
        accountId: userData.accountId,
        username: userData.username,
        password: userData.password,
        lastLoginDateTime: userData.lastLoginDateTime,
        userId: userData.userId
      });
      await user.save();
      await accountLogin.save();
      const kafkaProducer = new KafkaProducer(process.env.KAFKA_BROKER);
      await kafkaProducer.connect();
      await kafkaProducer.sendMessage('kafka_valahdyo_betest', userData);
      await kafkaProducer.disconnect();
      return user;
  }

  async getUserByAccountNumber(accountNumber) {
    const userCached = cache.get(`user:${accountNumber}`, async () => {
        const user = await User.findOne({ accountNumber }).lean().exec();
        if (user) {
          user.accountLogin = await AccountLogin.findOne({ userId: user.userId }).lean().exec();
          delete user.accountLogin.password;
        }
        return user
    }, 10);
    return userCached
  }

   async getUserByRegistrationNumber(registrationNumber) {
    const userCached = cache.get(`user:${registrationNumber}`, async () => {
        const user = await User.findOne({ registrationNumber }).lean().exec();
        if (user) {
          user.accountLogin = await AccountLogin.findOne({ userId: user.userId }).lean().exec();
          delete user.accountLogin.password;
        }
        return user
    }, 10);
    return userCached
  }

   async getAccountLoginsOlderThan(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return AccountLogin.find({ lastLoginDateTime: { $lt: date } }).exec();
  }

   async updateUser(userId, updateData) {
    const user = await User.findOneAndUpdate({ userId }, updateData, { new: true }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    await AccountLogin.findOneAndUpdate({ userId }, updateData, { new: true }).exec();
    return user;
  }

   async deleteUser(userId) {
    const user = await User.findOneAndDelete({ userId }).exec();
    if (!user) {
      throw new Error('User not found');
    }
    await AccountLogin.findOneAndDelete({ userId }).exec();
    return user;
  }
}

module.exports = UserService;
