import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    mobile: number;
    password: string;
    role: string;
    isBlock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        mobile: { type: Number },
        password: { type: String, trim: true },
        role: { type: String, enum: ['staff', 'admin'] },
        isBlock: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
