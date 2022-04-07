"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const balancesController_1 = require("../controllers/balancesController");
const router = express_1.default.Router();
//get all balances/accounts
router.get('/', async (req, res) => {
    const data = await balancesController_1.readAllAccounts();
    res.send({ data: data });
});
//get a particlar balance
router.get('/balance/:account_no', async (req, res) => {
    const account_no = Number(req.params.account_no);
    const accountNoToString = account_no.toString();
    if (accountNoToString.length !== 11) {
        res.send({ message: 'Invalid account number' });
        return;
    }
    const mySchema = zod_1.default.number().gte(10000000000).lte(99999999999);
    const validAccount_no = mySchema.parse(account_no);
    const accounts = await balancesController_1.readAllAccounts();
    const account = accounts.find((acc) => acc.accountNumber === validAccount_no);
    if (!account) {
        return { message: 'Account not found' };
    }
    res.send(account);
});
//create an account
router.post('/create-account', async (req, res) => {
    try {
        const User = zod_1.default.object({
            balance: zod_1.default.number(),
        });
        const data = req.body;
        const validData = User.parse(data);
        const account = await balancesController_1.createAccount(validData);
        res.status(201).send({ data: account });
        console.log(validData);
    }
    catch (error) {
        if (error instanceof Error) {
            //error.issues[0].message
            res.send({ message: 'Please enter a valid amount' });
            return;
        }
    }
});
exports.default = router;
//# sourceMappingURL=balances.js.map