const UserService = require('../services/UserService');

class UserController {
    async createUser(req, res) {
        try {
            const userService = new UserService();
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserByAccountNumber(req, res) {
        try {
            const userService = new UserService();
            const user = await userService.getUserByAccountNumber(req.params.accountNumber);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserByRegistrationNumber(req, res) {
        try {
            const userService = new UserService();
            const user = await userService.getUserByRegistrationNumber(req.params.registrationNumber);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
      try {
        const userService = new UserService();
        const updatedUser = await userService.updateUser(req.params.userId, req.body);
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    async deleteUser(req, res) {
      try {
        const userService = new UserService();
        const deletedUser = await userService.deleteUser(req.params.userId);
        res.status(200).json(deletedUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    
}

module.exports = new UserController();
