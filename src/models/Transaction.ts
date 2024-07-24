import mongoose, { Schema, model, Document } from 'mongoose';

// Interface representing a document in MongoDB.
interface ITransaction extends Document {
  name: string;
  amount: number;
  channel: string;
  category: string;
  senderId: string;
  receiverId: string;
  senderBankId: string;
  receiverBankId: string;
  email: string;
}

// Schema corresponding to the document interface.
const transactionSchema = new Schema<ITransaction>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  channel: { type: String, default: 'online' },
  category: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  senderBankId: { type: String, required: true },
  receiverBankId: { type: String, required: true },
  email: { type: String, required: true }
});

// Create a model.
const Transaction = mongoose.models.Transaction as mongoose.Model<ITransaction> || mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
