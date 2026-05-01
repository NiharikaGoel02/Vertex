import mongoose, { Schema, Document } from 'mongoose';

export interface IRoadmap extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  summary?: string;
  timeline?: string;
  phases: any[];
  leetcode?: any;
  interviewPrep?: any;
  completionStatus: Map<string, boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    summary: { type: String },
    timeline: { type: String },
    phases: { type: [Schema.Types.Mixed], default: [] },
    leetcode: { type: Schema.Types.Mixed },
    interviewPrep: { type: Schema.Types.Mixed },
    completionStatus: { type: Map, of: Boolean, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.Roadmap || mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
