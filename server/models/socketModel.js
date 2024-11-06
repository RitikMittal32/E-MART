import mongoose from 'mongoose';

const userSocketSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    socketId: { type: String, required: true }
});

const UserSocket = mongoose.model('UserSocket', userSocketSchema);

export default UserSocket;
