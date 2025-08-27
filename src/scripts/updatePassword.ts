import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/user.model';

dotenv.config();

const updateUserPassword = async () => {
    try {
        console.log('🔧 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅ Connected to MongoDB');

        // Hash the password admin@123
        const newPassword = 'admin@123';
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        // Update the user's password
        const result = await UserModel.findOneAndUpdate(
            { email: 'super@admin.com' },
            { password: hashedPassword },
            { new: true }
        );

        if (result) {
            console.log(`🔐 Updated password for: ${result.email}`);
            console.log(`📝 New password: ${newPassword}`);
            console.log(`🔑 Hash: ${hashedPassword}`);
        } else {
            console.log('❌ User not found');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating password:', error);
        process.exit(1);
    }
};

updateUserPassword();
