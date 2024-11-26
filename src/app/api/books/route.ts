import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";


export const GET = async () => {
  try {
    const filePath = path.join(process.cwd(), "public","data.json");
    const jsonData = await fs.readFile(filePath, "utf8");
    const books: Book[] = JSON.parse(jsonData); // Explicitly type the data

    return NextResponse.json(books);
  } catch (error) {
    console.error("Failed to load book data:", error);
    return NextResponse.json(
      { error: "Failed to load book data" },
      { status: 500 }
    );
  }
};
