import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from '../models/user.model';

dotenv.config();

const fixUserPasswords = async () => {
    try {
        console.log('🔧 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('✅ Connected to MongoDB');

        // Find users with missing or null passwords
        const usersWithoutPasswords = await UserModel.find({
            $or: [
                { password: { $exists: false } },
                { password: null },
                { password: "" }
            ]
        });

        console.log(`📋 Found ${usersWithoutPasswords.length} users without passwords`);

        for (const user of usersWithoutPasswords) {
            // Set default password based on email
            let defaultPassword = 'admin123'; // Default password
            
            if (user.email.includes('super')) {
                defaultPassword = 'super123';
            }

            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            
            await UserModel.findByIdAndUpdate(user._id, {
                password: hashedPassword
            });
            
            console.log(`🔐 Set password for user: ${user.email} (password: ${defaultPassword})`);
        }

        console.log('✅ All user passwords have been fixed!');
        console.log('📝 Default passwords set:');
        console.log('   - super@admin.com: super123');
        console.log('   - other users: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error fixing passwords:', error);
        process.exit(1);
    }
};

fixUserPasswords();
