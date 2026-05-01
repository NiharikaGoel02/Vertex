import mongoose, { Schema, Document } from 'mongoose';

export interface IResumeAnalysis extends Document {
  user?: mongoose.Types.ObjectId;
  parsedText: string;
  targetRole?: string;
  readinessScore?: number;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeAnalysisSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parsedText: { type: String, required: true },
    targetRole: { type: String },
    readinessScore: { type: Number },
    summary: { type: String },
    strengths: { type: [String] },
    gaps: { type: [Schema.Types.Mixed] },
    improvements: { type: [Schema.Types.Mixed] },
    keywords: { type: Schema.Types.Mixed },
    actionPlan: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.ResumeAnalysis || mongoose.model<IResumeAnalysis>('ResumeAnalysis', ResumeAnalysisSchema);
