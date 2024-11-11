import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dnaApi';
    try {
        await mongoose.connect(uri)
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection failed', error);
        process.exit(1);
    }
};

export default connectDb;
