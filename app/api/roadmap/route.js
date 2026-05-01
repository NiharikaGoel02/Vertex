import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Roadmap from '@/models/Roadmap';

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, title, summary, timeline, phases, leetcode, interviewPrep, completionStatus } = await req.json();
    
    if (!title || !phases) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const roadmap = await Roadmap.create({
      user: userId || new mongoose.Types.ObjectId(), // Use placeholder if no userId
      title,
      summary,
      timeline,
      phases,
      leetcode,
      interviewPrep,
      completionStatus: completionStatus || {},
    });

    return NextResponse.json({ success: true, roadmap }, { status: 201 });
  } catch (error) {
    console.error('Roadmap creation error:', error);
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

    const roadmaps = await Roadmap.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, roadmaps });
  } catch (error) {
    console.error('Roadmap fetch error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req) {
    try {
        await dbConnect();
        const { id, completionStatus } = await req.json();

        if (!id || !completionStatus) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const roadmap = await Roadmap.findByIdAndUpdate(
            id,
            { $set: { completionStatus } },
            { new: true }
        );

        if (!roadmap) {
            return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, roadmap });
    } catch (error) {
        console.error('Roadmap update error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
