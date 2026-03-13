import { useNavigate } from "react-router"

function App() {
  const Navigate = useNavigate()
  return (
    <div className=' text-black  min-h-screen' >
      <div className=" flex flex-col justify-center align-center text-center py-16" id="main-text">
        <div className="text-6xl font-bold tracking-wider">
          Build automations <br /> that think in chains,<br></br> not steps.
        </div>

        <div className="text-md tracking-tighter mt-3">
          Connect APIs, logic, and AI into powerful workflows without the drag.
        </div>
        <div className="mt-4">

          <button className="bg-black text-white py-1 px-4 rounded text-xl" onClick={() => Navigate('/login')}>
            Start
          </button>
        </div>
      </div>
      {/* Visual workflow builder
Webhooks and API automation
 Run locally or deploy anywhere */}
      <div className="flex flex-row w-full overflow-x-scroll">
        <div className="py-8 min-w-screen border border-black flex justify-center items-center">
          <div className="border border-black p-4">
            Trigger Start workflows with webhooks, schedules, or events.
          </div>
          <span className="border border-black w-1 w-full"></span>
        </div>
        <div className="py-8 min-w-screen border border-black flex justify-center items-center">
          <span className="border border-black w-1 w-full"></span>
          <div className="border border-black p-4">

            Connect Link APIs, apps, and custom logic using nodes.
          </div>
          <span className="border border-black w-1 w-full"></span>
        </div>
        <div className="min-w-screen border border-black flex justify-center items-center">
          <span className="border border-black w-1 w-full"></span>
          <div className="border border-black p-4">
            Run Automate tasks instantly or on schedule.
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <span className="text-xs bg-gray-300 rounded p-2">DEVELOPER AUTOMATION</span>
        <h2 className="text-4xl font-semibold">Automate APIs Visually</h2>
        Build automation pipelines with webhooks, API calls, and custom logic.
        <div className="bg-black w-screen h-64">

        </div>
      </div>

      <footer className="flex items-center justify-center">
        Made with ❤️ by <span className="font-bold ml-1"> GoldGroove06</span>
      </footer>
    </div>
  )
}

export default App
