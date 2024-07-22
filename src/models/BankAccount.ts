import { Schema, model, Document , Types } from 'mongoose';
import mongoose from 'mongoose';

interface IBankAccount extends Document {
  userID: Types.ObjectId;
  bankID: string;
  accountID: string;
  accessToken: string;
  fundingSourceURL: string;
  sharableURL: string;
}

const BankAccountSchema = new Schema<IBankAccount>({
  userID: { type: Schema.Types.ObjectId ,
    ref:'User'
    , required: true },
  bankID: { type: String, required: true },
  accountID: { type: String, required: true },
  accessToken: { type: String, required: true },
  fundingSourceURL: { type: String, required: true },
  sharableURL: { type: String, required: true },
}, {
  timestamps: true,
});

const BankAccount = mongoose.models.BankAccount as mongoose.Model<IBankAccount>|| model<IBankAccount>('BankAccount', BankAccountSchema);

export { BankAccount};
