import React from 'react';

function Navbar(props) {
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
            </div>
        </nav>
    )
}

export default Navbar;