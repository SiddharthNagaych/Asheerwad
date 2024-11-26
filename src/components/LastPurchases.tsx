type LastPurchasesProps = {
  books?: Book[]; // Make books optional to avoid runtime errors
};

export default function LastPurchases({ books = [] }: LastPurchasesProps) {
  return (
    <div className="flex flex-col justify-between h-[45%] w-full space-y-4">
      {books.length > 0 ? (
        books.slice(0, 3).map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
          >
            <div>
              <p className="text-sm font-semibold text-white">{book.name}</p>
              <p className="text-gray-400 text-xs">₹{book.price}</p>
            </div>
            <button className="text-yellow-500 text-sm">•••</button>
          </div>
        ))
      ) : (
        <div className="text-gray-400 text-center">
          No recent purchases available.
        </div>
      )}
    </div>
  );
}
