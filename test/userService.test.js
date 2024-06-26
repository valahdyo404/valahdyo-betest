const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const UserService = require('../src/services/UserService');
const User = require('../src/models/User');
const AccountLogin = require('../src/models/Account');
const redisClient = require('../src/config/redis');


chai.use(sinonChai);
const expect = chai.expect;

describe('UserService', () => {
    let userStub, accountLoginStub, redisStub, kafkaStub;

    beforeEach(() => {
        userStub = sinon.stub(User.prototype, 'save');
        accountLoginStub = sinon.stub(AccountLogin.prototype, 'save');
        redisStub = sinon.stub(redisClient, 'get').resolves(null);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('createUser', () => {
        it('should create a new user and account login, and send user data to Kafka', async () => {
            const userData = {
                userId: 'testUserId',
                fullName: 'Test User',
                accountNumber: '123456',
                emailAddress: 'test@example.com',
                registrationNumber: 'reg123456'
            };
            const accountData = {
                accountId: 'accountId123',
                userName: 'testUser',
                password: 'password'
            };

            const userService = new UserService()
            await userService.createUser(userData, accountData);

            expect(userStub).to.have.been.calledOnce;
            expect(accountLoginStub).to.have.been.calledOnce;
        });
    });
});
