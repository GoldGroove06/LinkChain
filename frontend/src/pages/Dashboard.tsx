import Cards from "../components/Cards";


function Dashboard() {
	return(
		<div>
		<div className="flex flex-row justify-between">
			<div>UserName</div>
			<div>New Workspace</div>
		</div>
		<div className="flex flex-row gap-4">
			<Cards name="Name" description="Description"/>
			<Cards name="Name2" description="Description2"/>

		</div>
		</div>
	)
}

export default Dashboard;
