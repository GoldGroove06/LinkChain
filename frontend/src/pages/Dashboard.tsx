import {useEffect, useState } from "react";
import Cards from "../components/Cards";


function Dashboard() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
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
          console.log(data)
		}
        
      } catch (error) {
        console.log(error);
      }
    }

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
	  console.log(data);
	} catch (e) {
	  console.log(e);
	}
  };

	return(
		<div>
		<div className="flex flex-row justify-between">
			<div>UserName</div>
			<div>New Workspace</div>
		</div>
		<div>
			<input type="text" name="name" placeholder="workpace name" value={name} onChange={(e)=> {setName(e.target.value)}}/>
			<input type="text" name="description" placeholder="workpace description" value={description} onChange={(e)=> {setDescription(e.target.value)}}/>
			<button onClick={handleCreateWorkspace}>Create</button>
		</div>
		<div className="flex flex-row gap-4">
			<Cards name="Name" description="Description"/>
			<Cards name="Name2" description="Description2"/>

		</div>
		</div>
	)
}

export default Dashboard;
