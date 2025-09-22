import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetAdvocatesResponse>> {
  const searchParams = request.nextUrl.searchParams;

  const searchTerm = searchParams.get("searchTerm");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 5;

  let advocates = advocateData;

  // filter advocates by search term
  if (searchTerm) {
    advocates = advocates.filter((advocate) => {
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

  let totalPages = Math.ceil(advocates.length / pageSize);

  // slice advocates by page for pagination
  advocates = advocates.slice((page - 1) * pageSize, page * pageSize);

  const response = {
    advocates,
    totalPages,
  };

  return NextResponse.json(response);
}
