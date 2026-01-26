import mongoose from 'mongoose';

const DealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dealName: {
        type: String,
        required: [true, 'Please provide a name for the deal'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    advance: {
        type: Number,
        required: true,
    },
    royaltySplit: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Deal || mongoose.model('Deal', DealSchema);
