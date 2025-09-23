import { getAllApplicants } from "@/lib/db/applicantsRepo";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getAllApplicants();
    console.log(data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
