const AccountService = require('../services/AccountService');
const { generateToken } = require('../utils/jwtUtils');

class AccountController {
    async createAccount(req, res) {
        try {
            const accountService = new AccountService();
            const account = await accountService.createAccount(req.body);
            res.status(201).json(account);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const accountService = new AccountService();
            const account = await accountService.authenticate(req.body.userName, req.body.password);
            const token = generateToken({ userId: account.userId });
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getRecentLogins(req, res) {
        try {
            const accountService = new AccountService();
            const accounts = await accountService.getAccountsByLastLogin(3);
            res.status(200).json(accounts);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new AccountController();
