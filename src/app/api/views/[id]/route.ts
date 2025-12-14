import { getViewCount, incrementViewCount } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

// GET: 조회수 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const views = await getViewCount(id);
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Error getting view count:", error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

// POST: 조회수 증가
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const views = await incrementViewCount(id);
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json(
      { error: "Failed to increment views" },
      { status: 500 }
    );
  }
}
