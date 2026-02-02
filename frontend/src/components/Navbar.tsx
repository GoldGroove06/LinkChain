function Navbar() {
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
        <nav className="flex flex-row justify-between align-center mt-4 mx-8 px-2 py-2 border border-zinc-300 rounded shadow-md">
            <div>
                <a href="/" className="font-medium tracking-tighter text-lg">
                LinkChain
                </a>
            </div>
            <div className="flex align-center">
                <button>
                <a href="/login" className="mx-1">
                
                    Login
                    
                </a>
                </button>
                <button>
                <a href="/signup" className="mx-1">
                    Signup
                </a>
                </button>
                <button onClick={logout} className="mx-1">Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar;