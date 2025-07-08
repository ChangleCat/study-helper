import "./App.css";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { useWindowStore } from "./store/useWindowStore";
import { cn } from "./util/cn"; // 新增引入

function App() {
  const isMax = useWindowStore((state) => state.isMax);
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col bg-white overflow-hidden shadow-2xl transition-all",
        (!isMax) && "h-160 w-270 rounded-xl border-2 border-gray-400"
      )}
    >
      <Header className="w-full" />
      <Body className="flex-1 w-full" />
    </div>
  );
}

export default App;