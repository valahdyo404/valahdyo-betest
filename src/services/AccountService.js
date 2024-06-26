const Account = require('../models/Account');
const bcrypt = require('bcryptjs');

class AccountService {
    async createAccount(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const account = new Account({ ...data, password: hashedPassword });
        return account.save();
    }

    async authenticate(userName, password) {
        const account = await Account.findOne({ userName });
        if (!account || !(await bcrypt.compare(password, account.password))) {
            throw new Error('Invalid credentials');
        }
        return account;
    }

    async getAccountsByLastLogin(days) {
        return Account.find({ lastLoginDateTime: { $gt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } });
    }
}

module.exports = AccountService;
