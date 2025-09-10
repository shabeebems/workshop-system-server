"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const customer_model_1 = __importDefault(require("../../models/customer.model"));
const base_repositories_1 = require("./base.repositories");
class CustomerRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(customer_model_1.default);
        this.findByUniqueCode = (uniqueCode) => this.model.findOne({ uniqueCode });
        this.findByMobile = (mobile) => this.model.findOne({ mobile });
        this.searchCustomers = (searchTerm) => this.model.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { mobile: { $regex: searchTerm, $options: 'i' } },
                { uniqueCode: { $regex: searchTerm, $options: 'i' } }
            ]
        });
    }
}
exports.CustomerRepository = CustomerRepository;
