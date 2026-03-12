import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const HamburgerMenuSvg = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
const PlusCircledSvg = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

function Dashboard() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [worspace, setWorkspace] = useState<any>([])
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	async function fetchWorkspace() {
		try {
			const res = await fetch('http://localhost:3000/workspace/get',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include', // send cookies
				});

			if (res.ok) {
				const data = await res.json();
				setWorkspace(data.workspace)
			}

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchWorkspace();
	}, []);

	const handleCreateWorkspace = async () => {
		try {
			const response = await fetch('http://localhost:3000/workspace/new', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, description }),
			});
			const data = await response.json();
			fetchWorkspace()
			setName('')
			setDescription('')
			setIsMenuOpen(false)
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	const handleDeleteWorkspace = async (id: string) => {
		try {
			const response = await fetch(`http://localhost:3000/workspace/delete/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const data = await response.json();
			fetchWorkspace()
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="flex flex-row h-screen" >
			{/* <div className={`w-10 border border-black ${isMenuOpen ? 'w-1/2' : 'w-25'}`}>
				<button onClick={() => setIsMenuOpen(!isMenuOpen)}><HamburgerMenuSvg /></button>
				<div>
					<button> <PlusCircledSvg/></button>
					<div className="flex flex-col gap-2">
						{worspace.map((workspace: any) => (
							workspace.name
						))}
					</div>
				</div>
			</div> */}
			<div className="m-8">


				<div className="flex flex-row justify-between">
				
				</div>
				<button onClick={() => setIsMenuOpen(true)}><PlusCircledSvg /></button>
				<div className={`flex flex-col gap-2 ${isMenuOpen ? 'block' : 'hidden'}`}>
					<input type="text" name="name" placeholder="workpace name" value={name} onChange={(e) => { setName(e.target.value) }} />
					<input type="text" name="description" placeholder="workpace description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
					<button onClick={handleCreateWorkspace}>Create</button>
				</div>
				<div className="flex flex-row gap-4">
					{worspace.map((workspace: any) => (
						<Cards name={workspace.name} description={workspace.description} onDelete={() => handleDeleteWorkspace(workspace._id)} location={'/workspace/' + workspace._id} />

					))}

				</div>
			</div>
		</div>
	)
}

export default Dashboard;
