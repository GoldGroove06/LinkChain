import { useNavigate } from "react-router"

function App() {
  const Navigate = useNavigate()
  return (
    <div className=' text-black  min-h-screen' >
      <div className=" flex flex-col justify-center align-center text-center py-16" id="main-text">
        <div className="text-4xl font-bold tracking-wider">
          Build automations <br /> that think in chains,<br></br> not steps.
        </div>

        <div className="text-sm tracking-tighter mt-1">
          Connect APIs, logic, and AI into powerful workflows without the drag.
        </div>
        <div className="mt-4">
          
          <button className="bg-black text-white py-1 px-4 rounded" onClick={() => Navigate('/login')}>
            Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
