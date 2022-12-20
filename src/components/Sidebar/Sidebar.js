import TreeView from './TreeView'
import RootcollectionSelector from './RootcollectionSelector'

import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="component-sidebar">
      <RootcollectionSelector />
      <TreeView />
    </div>
  )
}

export default Sidebar