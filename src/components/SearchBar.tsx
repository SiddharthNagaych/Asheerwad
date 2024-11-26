export default function SearchBar() {
    return (
      <div className="flex items-center bg-gray-700 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search any book..."
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-400"
        />
        <button className="bg-orange-500 rounded-full p-2 ml-2">
          🔍 {/* Replace with a search icon */}
        </button>
      </div>
    );
  }
  