import React from 'react';

function Signup() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function signUp() {
        try {
            setSubmitError(null);
            setIsSubmitting(true);
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password, confirmPassword: confirmPassword, username }),
            });
            const data = await response.json();
            if (!response.ok) {
                setSubmitError(data.message || 'Sign up failed.');
                return;
            }
            window.location.href = '/login';
        } catch (e) {
            setSubmitError('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-4xl mx-auto">
                <div className=" p-8 max-w-md mx-auto border-zinc-300 border rounded">
                    <h1 className="text-4xl font-bold text-center mb-2 ">
                        Create Account
                    </h1>

                    <form onSubmit={(e) => { e.preventDefault(); signUp(); }} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium  mb-2">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                required 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border-zinc-300 border rounded"
                                placeholder="Enter your name"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium  mb-2">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-zinc-300 border rounded"
                                placeholder="Enter your email"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium  mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-zinc-300 border rounded"
                                placeholder="Create a password"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium  mb-2">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                required 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border-zinc-300 border rounded"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium  mb-2">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border-zinc-300 border rounded"
                                placeholder="Enter your username"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 border-zinc-300 border rounded ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Creating account…' : 'Sign Up'}
                        </button>

                        {submitError && (
                            <div className="mt-2  p-3 text-sm">
                                {submitError}
                            </div>
                        )}

                        <div className="text-center">
                            Already have an account?
                            <a href="/login" className=" ml-1 font-medium">
                                Sign in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;