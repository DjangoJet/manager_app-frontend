import { useEffect, useRef, useState } from "react"

import './TreeNode.css'

import { useGetCollection } from "../../hooks/collection/useGetCollection"

import ModalCreateCollection from './Modals/ModalCreateCollection'
import ModalEditCollection from './Modals/ModalEditCollection'
import ModalDeleteCollection from './Modals/ModalDeleteCollection'

const TreeNode = ({ collection_id, level = 0 }) => {
  const [isActive, setIsActive] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  const dropdownMenuRef = useRef()

  const { fetchCollection, collection, setCollection } = useGetCollection()

  useEffect(() => {
    const fetchData = async () => await fetchCollection(collection_id)
    fetchData(collection_id)
  }, [])

  useEffect(() => {
    const handler = e => {
      if (!dropdownMenuRef.current.contains(e.target)) {
        setIsOpenDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  })

  const handleClick = () => {
    setIsActive(prev => !prev)
  }

  const handleDropdown = () => {
    setIsOpenDropdown(prev => !prev)
  }

  const handleCreate = () => {
    setIsOpenModalCreate(prev => !prev)
  }

  const handleEdit = () => {
    setIsOpenModalEdit(prev => !prev)
  }

  const handleDelete = () => {
    setIsOpenModalDelete(prev => !prev)
  }

  return (
    <>
      {collection && (
        <li>
          <div className="tree_node-dropdown" ref={dropdownMenuRef}>
            <span onClick={handleClick}>{collection.name}</span>
            <button onClick={handleDropdown}>...</button>
            <div
              className={`dropdown-dropdown_menu ${isOpenDropdown ? 'active' : 'inactive'}`}
            >
              <button onClick={handleCreate}>Create</button>
              <ModalCreateCollection
                open={isOpenModalCreate}
                setOpen={setIsOpenModalCreate}
                setCollection={setCollection}
              />
              <button onClick={handleEdit}>Edit</button>
              <ModalEditCollection
                open={isOpenModalEdit}
                setOpen={setIsOpenModalEdit}
                setCollection={setCollection}
              />
              <button onClick={handleDelete}>Delete</button>
              <ModalDeleteCollection
                open={isOpenModalDelete}
                setOpen={setIsOpenModalDelete}
              />
            </div>
          </div>
        </li>

      )}
      {isActive && (<ul>{collection.childrens.map(children => (
        <TreeNode
          key={children._id}
          collection_id={children._id}
          level={level + 1}
        />
      ))}</ul>)}
    </>
  )
}

export default TreeNode