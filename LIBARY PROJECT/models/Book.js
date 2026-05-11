import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    isbn: { type: String, trim: true, unique: true, required: true },
    category: { type: String, trim: true, default: 'General' },
    publisher: { type: String, trim: true },
    totalCopies: { type: Number, required: true, min: 0 },
    copiesAvailable: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

bookSchema.pre('save', function (next) {
  if (this.isModified('totalCopies') && !this.isModified('copiesAvailable')) {
    this.copiesAvailable = this.totalCopies;
  }
  next();
});

export default mongoose.model('Book', bookSchema);
