import { LevelList } from './pages/LevelList';
import { Header } from './pages/header';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header/>
      {/* Load the level list from other page */}
      <LevelList />
    </div>
  )
}

export default App
