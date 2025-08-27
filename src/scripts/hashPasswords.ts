import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/user.model';

dotenv.config();

const hashExistingPasswords = async () => {
    try {
        console.log('🔧 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅ Connected to MongoDB');

        // Find all users with plain text passwords (passwords that don't start with $2b$)
        const users = await UserModel.find({
            $and: [
                { password: { $exists: true } },
                { password: { $ne: null } },
                { password: { $ne: "" } },
                { password: { $not: /^\$2b\$/ } }
            ]
        });

        console.log(`📋 Found ${users.length} users with plain text passwords`);

        for (const user of users) {
            if (user.password && user.password.trim() !== '') {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await UserModel.findByIdAndUpdate(user._id, {
                    password: hashedPassword
                });
                console.log(`🔐 Hashed password for user: ${user.email}`);
            } else {
                console.log(`⚠️  Skipping user ${user.email} - empty password`);
            }
        }

        console.log('✅ All passwords have been hashed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error hashing passwords:', error);
        process.exit(1);
    }
};

hashExistingPasswords();
