
const SearchBar = ({ searchLocation, setSearchLocation, handleSearch }) => {
  return (
    <form
      onSubmit={handleSearch}
      className="p-4 border-b bg-gray-50 flex gap-2"
    >
      <input
        type="text"
        placeholder="Search by location..."
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        className="flex-1 p-2 border rounded-md outline-none"
      />
      <button
        type="submit"
        className="cursor-pointer bg-blue-600 text-white px-2 text-sm rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
