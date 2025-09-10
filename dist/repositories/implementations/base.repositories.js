"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
        this.create = (data) => this.model.create(data);
        this.findById = (_id) => this.model.findById(_id);
        this.findAll = () => this.model.find();
        this.updateById = (_id, data) => this.model.findOneAndUpdate({ _id }, { $set: { ...data } });
    }
}
exports.BaseRepository = BaseRepository;
