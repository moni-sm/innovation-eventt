import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    jobRole: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Attended', 'Cancelled'],
      default: 'Confirmed'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
