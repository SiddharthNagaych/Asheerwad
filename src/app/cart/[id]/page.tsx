"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";

export default function Cart() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/book/${id}`);
          console.log(res);
          if (!res.ok) {
            throw new Error(`Failed to fetch book details with status: ${res.status}`);
          }
          const data: Book = await res.json();
           // Use the `Book` type here
          setBook(data);
        } catch (error) {
          setError("Error fetching book details.");
          console.error("Error fetching book:", error);
        }
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return (
      <div className="text-red-500 text-center mt-20">
        {error}
      </div>
    );
  }

  if (book === null) {
    return (
      <div className="text-black text-center mt-20">
        {id ? "Loading book details..." : "No book selected."}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-yellow-500">{book.name}</h2>
        <p className="text-gray-300 mt-2">{book.description}</p>
        <p className="text-white font-medium mt-4">Price: ${book.price}</p>
      </div>
    </div>
  );
}
