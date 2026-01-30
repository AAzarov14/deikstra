import './App.css'
import Sidebar from './components/Sidebar'
import BgImagePicker from './components/BgImagePicker'
import Workspace from './components/Workspace'
import ContextMenu from './components/ContextMenu'

function App() {
  return (
    <div className='appContent'>
      <Sidebar />
      <div id='workspaceWrapper'>
        <BgImagePicker />
        <Workspace />
        <ContextMenu />
      </div>
    </div>
  )
}

export default App
