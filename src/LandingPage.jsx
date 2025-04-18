import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from './firebase-config';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 underline mb-6">Welcome to LinkedOut!</h1>

      <div className="flex gap-8 mb-6">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src="/vite.svg" className="logo w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src="/react.svg" className="logo react w-16" alt="React logo" />
        </a>
      </div>

      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-6"
        onClick={signInWithGoogle}
      >
        Sign In with Google
      </button>

      <h2 className="text-2xl text-gray-700 text-center max-w-xl mt-6">
        "You're building something really smart": a clean, professional, link-based CV/portfolio site that's:
      </h2>
      <ul className="mt-2 text-lg text-gray-600 list-disc pl-5 max-w-2xl text-left">
        <li>🔗 Private but shareable</li>
        <li>💡 Minimal effort for non-techy users - no wasted time on design etc - straight to it. Save time, energy, for all. CV's take too much time and thought, when it should just be a place where you write some information on and send it. We focus on other things but this. This is gonna resonate with them all - both sides of CV as well, sender and receiver.</li>
        <li>🎯 Recruiter-friendly</li>
        <li>🎭 Easy to use by all, and seemless and clear.</li>
      </ul>
    </div>
  );
}
