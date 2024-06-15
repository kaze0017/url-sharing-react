import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface HomeContextType {
  view: "cardImgIconS" | "cardSharedLg" | "grid";
  setView: Dispatch<SetStateAction<"cardImgIconS" | "cardSharedLg" | "grid">>;
  mode: "saved" | "public" | "trend";
  setMode: Dispatch<SetStateAction<"saved" | "public" | "trend">>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  sortBy: "rank" | "shared" | "saved";
  setSortBy: Dispatch<SetStateAction<"rank" | "shared" | "saved">>;
}

const HomeContext = createContext<HomeContextType>({
  view: "cardImgIconS",
  setView: () => {},
  mode: "saved",
  setMode: () => {},
  query: "",
  setQuery: () => {},
  sortBy: "rank",
  setSortBy: () => {},
});

interface HomeProviderProps {
  children: ReactNode;
}

export default function HomeProvider({ children }: HomeProviderProps) {
  const [view, setView] = useState<"cardImgIconS" | "cardSharedLg" | "grid">(
    "cardImgIconS"
  );
  const [mode, setMode] = useState<"saved" | "public" | "trend">("saved");
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rank" | "shared" | "saved">("rank");

  return (
    <HomeContext.Provider
      value={{ view, setView, mode, setMode, query, setQuery, sortBy, setSortBy }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
