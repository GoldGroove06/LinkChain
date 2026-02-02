import React from 'react';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function signIn() {
        try {
            setSubmitError(null);
            setIsSubmitting(true);
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await response.json();
            if (response.ok && data.message === "Logged in") {
                window.location.href = '/dashboard';
                return;
            }
            setSubmitError(data.message || 'Sign in failed.');
        } catch (e) {
            setSubmitError('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen mt-10">
            <div className="max-w-4xl mx-auto">
                <div className=" p-8 max-w-md mx-auto border-zinc-300 border rounded shadow">
                    <h1 className=" text-center font-bold">
                        Sign In
                    </h1>

                    <form onSubmit={(e) => { e.preventDefault(); signIn(); }} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block  mb-2">Email</label>
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
                            <label htmlFor="password" className="block  mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-zinc-300 border rounded"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 border-zinc-300 border rounded ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Signing in…' : 'Sign In'}
                        </button>

                        {submitError && (
                            <div className="mt-2  p-3 text-sm ">
                                {submitError}
                            </div>
                        )}

                        <div className="text-center ">
                            Don't have an account?
                            <a href="/signup" className="ml-1 text-blue-500">
                                Sign up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;