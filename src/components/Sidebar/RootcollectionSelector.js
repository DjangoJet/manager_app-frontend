import { useState, useEffect, useRef } from 'react'

import './RootcollectionSelector.css'

import { useRootcollectionContext } from '../../hooks/rootcollection/useRootcollectionContext'
import { useGetUserRootcollections } from '../../hooks/user/useGetUserRootcollections'
import { useAuthContext } from '../../hooks/user/useAuthContext'

import ModalCreateRootcollection from './Modals/ModalCreateRootcollection'
import ModalEditRootcollection from './Modals/ModalEditRootcollection'
import ModalDeleteRootcollection from './Modals/ModalDeleteRootcollection'

const RootcollectionSelector = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  const dropdownMenuRef = useRef()

  const { active_rootcollection, rootcollections, dispatch } = useRootcollectionContext()
  const { fetchUserRootcollections } = useGetUserRootcollections()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => await fetchUserRootcollections()
    if (user && !rootcollections.length) {
      fetchData()
      console.log(active_rootcollection)
    }
  }, [user])

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

  const handleChange = e => {
    dispatch({ type: 'CHANGE_ACTIVE_ROOTCOLLECTION', payload: { rootcollection_id: e.target.value } })
  }

  const handleDropdown = e => {
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
    <div className="component-sidebar-rootcollection_selector">
      <select value={active_rootcollection._id} onChange={handleChange}>
        {rootcollections.map(rootcollection => (
          <option key={rootcollection._id} value={rootcollection._id}>{rootcollection.name}</option>))}
      </select>
      <div className={"rootcollection_selector-dropdown"} ref={dropdownMenuRef}>
        <button onClick={handleDropdown}>Edit</button>
        <div
          className={`dropdown-dropdown_menu ${isOpenDropdown ? 'active' : 'inactive'}`}
        >
          <button style={{ backgroundColor: "green" }} onClick={handleCreate}>Create</button>
          <ModalCreateRootcollection open={isOpenModalCreate} setOpen={setIsOpenModalCreate} />
          <button style={{ backgroundColor: "orange" }} onClick={handleEdit}>Edit</button>
          <ModalEditRootcollection open={isOpenModalEdit} setOpen={setIsOpenModalEdit} />
          <button style={{ backgroundColor: "red" }} onClick={handleDelete}>Delete</button>
          <ModalDeleteRootcollection open={isOpenModalDelete} setOpen={setIsOpenModalDelete} />
        </div>
      </div>
    </div>
  )
}

export default RootcollectionSelector