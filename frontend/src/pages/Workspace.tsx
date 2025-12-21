import { useParams } from "react-router";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";

function Workspace() {
	const {id} = useParams()
	const [automation, setAutomation] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	async function getAutomation() {
		const response = await fetch('http://localhost:3000/automation/get/'+id , {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include', // send cookies
		});
		const data = await response.json();
		setAutomation(data.automation);
		console.log(data);
	}

	useEffect(() => {
		getAutomation();
	},[]
	)

	const handleAutomationDelete = async (id: string) => {
		try {
			const response = await fetch(`http://localhost:3000/automation/delete/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const data = await response.json();
			getAutomation();
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	}

	const handleCreateAutomation = async () => {
		try{
			const response = await fetch('http://localhost:3000/automation/new', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, description, id }),
			});
			const data = await response.json();
			getAutomation();
			console.log(data);
		} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		}
		}
	}
	return(
		<div>
		<div className="flex flex-row justify-between">
			<div>Workspace Name</div>
			<div>New Automation</div>
		</div>
		<div>
			<input type="text" placeholder="Automation Name" value={name} onChange={(e) => setName(e.target.value)}/>
			<input type="text" placeholder="automation description" value={description} onChange={(e) => setDescription(e.target.value)}/>
			<button onClick={handleCreateAutomation}>create</button>
		</div>
		<div className="flex flex-row gap-4">
			{automation.map((automation) => (
				<Cards name={automation.name} description={automation.description} onDelete={() => handleAutomationDelete(automation._id)} location={"automation/" + automation._id}/>
			))}

		</div>
		</div>
	)
}

export default Workspace;
