import ReactDOM from 'react-dom';

const ModalDeleteCollection = ({ open, setOpen }) => {

  const handleDelete = async () => {
    setOpen(false)
  }

  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div className="overlay" />
      <div className="modal_create_rootcollection">
        <p>If you delete collection every collections, items etc belong to his will be delete too</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setOpen(prev => !prev)}>Cancle</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ModalDeleteCollection