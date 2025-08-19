import { Types } from "mongoose";

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T>;
    findById(_id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    updateById(_id: Types.ObjectId | string, data: object): Promise<T | null>;
}
