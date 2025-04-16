import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
          <h1 className="text-3xl font-bold underline text-blue-600">
          "You're building something really smart": a clean, professional, link-based CV/portfolio site that's: 🔗 Private but shareable (like Spotlight, but not overly public like LinkedIn) 💡 Minimal effort for non-techy users (no design headaches, no file downloading) 🎯 Recruiter-friendly (just click a link — fast and efficient) 🎭 With an exact layout similar to that Spotlight profile (because it works)
</h1>

        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
