import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import ResumeAnalysis from '@/models/ResumeAnalysis';

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, parsedText, targetRole, readinessScore, summary, strengths, gaps, improvements, keywords, actionPlan } = await req.json();

    if (!parsedText) {
      return NextResponse.json({ error: 'Parsed text is required' }, { status: 400 });
    }

    const analysis = await ResumeAnalysis.create({
      user: userId || new mongoose.Types.ObjectId(), // Placeholder for testing
      parsedText,
      targetRole,
      readinessScore,
      summary,
      strengths,
      gaps,
      improvements,
      keywords,
      actionPlan,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, analysis }, { status: 201 });
  } catch (error) {
    console.error('Resume Analysis creation error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    let query = {};
    if (userId) {
      query.user = userId;
    }

    const analyses = await ResumeAnalysis.find(query).sort({ timestamp: -1 });
    return NextResponse.json({ success: true, analyses });
  } catch (error) {
    console.error('Resume fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
