import { useState, useEffect } from "react";
import "./styles/output.css";
import TrackList from "./components/trackList";
import { Tracks } from "./constants";
import { millisToMinutesAndSeconds } from "./utilities/time";
import mixpanel from "mixpanel-browser";

mixpanel.init("edecfc8fbc2061a738a986f460f6bbd3");

const Header = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const search = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:8080/?q=${query}`)
      .then((res) => res.json())
      .then((res) => {
        mixpanel.track("search", {
          experiment_label: res.experimentLabel,
          expereriment_id: res.expererimentId,
        });
        setSearchResults(res);
        setIsLoading(false);
      });
  };

  const handleSearchItemClick = () => {
    mixpanel.track("search_result_click", {
      experiment_label: searchResults.experimentLabel,
      expereriment_id: searchResults.expererimentId,
    });
  };

  return (
    <div>
      <div
        className="my-3 flex flex-column mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-teal-500 focus-within:ring focus-within:ring-primary dark:focus-within:border-teal-500 focus-within:ring-opacity-40"
        style={{ width: 400 }}
      >
        <form
          onSubmit={search}
          class="flex flex-wrap justify-between md:flex-row"
        >
          <input
            autocomplete="off"
            type="search"
            name="query"
            style={{ width: 334 }}
            onChange={(e) => setQuery(e.target.value)}
            suggestions="false"
            placeholder="Search Tracks"
            required="required"
            className="flex-1 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
          />
          <button
            type="submit"
            id="search-button"
            className="flex items-center justify-center p-2 m-1 text-white transition-colors duration-200 transform rounded-md lg:w-12 lg:h-12 lg:p-0 bg-primary hover:bg-teal-300 focus:outline-none focus:bg-teal-300 bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      {searchResults.experimentLabel}
      <div class="z-100" style={{ zIndex: 100 }}>
        {searchResults.tracks &&
          searchResults.tracks.map((i) => {
            const { track } = i;
            return (
              <div
                id="search-result"
                class="pointer flex flex-col p-4 bg-gray-800 shadow-md hover:shodow-lg"
                onClick={handleSearchItemClick}
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      height="48"
                      width="48"
                      src={track.album.coverArt.sources[1].url}
                    />
                    <div class="flex flex-col ml-3">
                      <div class="font-medium leading-none text-gray-100">
                        {track.name}
                      </div>
                      <p class="text-sm text-gray-500 leading-none mt-1">
                        {track.artists.items
                          .map((artist) => artist.profile.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <div class="flex-no-shrink px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full">
                    {millisToMinutesAndSeconds(
                      track.duration.totalMilliseconds
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="p-4 flex justify-center items-start flex-col">
      <div class="mb-4">
        <Header />
      </div>
      <p class="font-sans text-5xl font-bold my-4">Discover Daily</p>
      <TrackList />
    </div>
  );
}

export default App;
