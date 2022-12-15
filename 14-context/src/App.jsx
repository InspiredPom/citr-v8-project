import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState,lazy,Suspense } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

//These are all static^^
//import Details from "./Details";
//import SearchParams from "./SearchParams";
//splitting these ^^ through lazy

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));
//import is in javascript
//these are not required, not loaded right away
//dynamic tho...?^^


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div className = "p-0 m-0" 
    /* no padding -p ,no margin -m */
    style = {{
      background:"url(https://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
  }}
  >
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback = {
              <div className="loading-pane">
                <h2 className="loader">Loading...</h2>
              </div>
            }
          >
            <header>
              <Link to = "/"> Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
