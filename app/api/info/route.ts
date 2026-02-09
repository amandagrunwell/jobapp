// app/api/info/route.ts
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cfo_email, ceo_name, ceo_email, domain, location } = body;

    const existingInfo = await prisma.info.findUnique({
      where: { cfo_email },
    });

    if (existingInfo) {
      return NextResponse.json(
        { error: "CFO email already exists" },
        { status: 400 },
      );
    }

    // Validate location is one of the allowed values
    const validLocations = ["Au", "Ca", "US"];
    if (!validLocations.includes(location)) {
      return NextResponse.json(
        { error: "Invalid location. Must be Au, Ca, or US" },
        { status: 400 },
      );
    }

    const newInfo = await prisma.info.create({
      data: {
        cfo_email,
        ceo_name,
        ceo_email: ceo_email || null,
        location: location || "US", // Default to US if not provided
        createdAt: new Date(),
      },
    });

    return NextResponse.json(newInfo, { status: 201 });
  } catch (error) {
    console.error("Error creating info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const infoList = await prisma.info.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(infoList);
  } catch (error) {
    console.error("Error fetching info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
