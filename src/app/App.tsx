import './App.css'
import { Sidebar } from './ui/Sidebar'
import { Chat } from './ui/Chat'

function App() {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <Chat />
    </section>
  )
}

export default App
