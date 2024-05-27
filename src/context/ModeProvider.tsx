import  {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode
} from "react";

interface ModeContextType {
  mode: string;
  setMode: Dispatch<SetStateAction<"wall" | "shared" | "trend">>;
}

const ModeContext = createContext<ModeContextType>({
  mode: "wall",
  setMode: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export default function ModeProvider({ children }: ModeProviderProps) {
  const [mode, setMode] = useState<"wall" | "shared" | "trend">("wall");
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export { ModeContext };
