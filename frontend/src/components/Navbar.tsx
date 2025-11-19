import React from 'react';

function Navbar(props) {
    async function logout() {
        const response = await fetch('http://localhost:3000/log-out', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
    }
    return (
        <nav className="flex flex-row justify-between">
            <div>
                LinkChain
            </div>
            <div>
                <button>
                    Login
                </button>
                <button>
                    Signup
                </button>
                <button onClick={logout} >Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar;