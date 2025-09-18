import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Advocate[]>> {
  const searchParams = request.nextUrl.searchParams;

  const searchTerm = searchParams.get("searchTerm");

  let data = advocateData;

  if (searchTerm) {
    data = data.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });
  }

  return NextResponse.json(data);
}
