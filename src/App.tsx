import { Header } from "./components/Header/Index"
import { Sidebar } from "./components/Sidebar/Index"

function App() {
  return (
    <div className="flex flex-col gap-6 h-screen">
      <Header />

      <div className="h-full flex flex-row lg:px-[142px]">
        <Sidebar />

        <div className="w-full">
          aaaa
        </div>
      </div>
    </div>
  )
}

export default App
