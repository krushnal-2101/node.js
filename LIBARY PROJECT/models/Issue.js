import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
    fine: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Issue', issueSchema);
