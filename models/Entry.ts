import mongoose, {Schema,Model} from 'mongoose';
import { Entry } from '../interfaces';

export interface Ientry extends Entry{
}

const entrySchema = new Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'finished'],
    message: 'Status must be pending, in-progress or finished',
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now
  }
})

export const EntryModel: Model<Ientry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)