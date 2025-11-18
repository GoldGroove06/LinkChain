import Cards from "../components/Cards";


function Workspace() {
	return(
		<div>
		<div className="flex flex-row justify-between">
			<div>Workspace Name</div>
			<div>New Automation</div>
		</div>
		<div className="flex flex-row gap-4">
			<Cards name="Name" description="Description"/>
			<Cards name="Name2" description="Description2"/>

		</div>
		</div>
	)
}

export default Workspace;
