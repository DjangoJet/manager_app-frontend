import { useState } from "react"
import ReactDOM from 'react-dom';

const ModalCreateCollection = ({ open, setOpen, setCollection }) => {
  const [name, setName] = useState('')

  const handleCancle = () => {
    setName('')
    setOpen(false)
  }

  const handleAdd = async () => {
    setName('')
    setOpen(false)
  }

  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div className="overlay" />
      <div className="modal_create_rootcollection">
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleCancle}>Cancle</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ModalCreateCollection