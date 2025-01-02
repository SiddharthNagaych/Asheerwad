import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContent = await fs.readFile(filePath, "utf-8");
    const books: Book[] = JSON.parse(fileContent);

    // Find the book by ID
    const book = books.find((book: Book) => book.id === id);

    if (book) {
      return NextResponse.json(book, { status: 200 });
    } else {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("JSON parsing error:", error);
      return NextResponse.json({ error: "Invalid JSON format in data file" }, { status: 400 });
    } else if (error instanceof Error) {
      console.error("Error reading book data:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
    }
  }
}
