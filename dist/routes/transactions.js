"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const transactionSchema = zod_1.default.object({
        amount: zod_1.default.number(),
        senderAccount: zod_1.default.number().gte(10000000000).lte(99999999999),
        recieverAccount: zod_1.default.number().gte(10000000000).lte(99999999999),
        transferDescription: zod_1.default.string(),
    });
    try {
        const data = req.body;
        const validData = transactionSchema.parse(data);
        const transferObj = await transactionController_1.transfer(validData);
        res.send(transferObj);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res
                .status(400)
                .send({ message: 'Please make sure your inputs are right' });
            return;
        }
    }
});
exports.default = router;
//# sourceMappingURL=transactions.js.map