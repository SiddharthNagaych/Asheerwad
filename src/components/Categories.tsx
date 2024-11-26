const categories = [
    "Autobiography",
    "Adventure",
    "Mystery",
    "Horror",
    "Science Fiction",
    "Romance",
    "Fantasy",
    "Biography",
  ];
  
  export default function Categories() {
    return (
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className="bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600"
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  