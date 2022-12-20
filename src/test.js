import { useEffect } from "react"

import './TreeView.css'

import { useCollectionContext } from "../../hooks/collection/useCollectionContext"
import { useGetRootcollectionCollections } from "../../hooks/rootcollection/useGetRootcollectionCollections"
import { useRootcollectionContext } from "../../hooks/rootcollection/useRootcollectionContext"
import { useAuthContext } from "../../hooks/user/useAuthContext"

const TreeView = () => {
  const { collections } = useCollectionContext()
  const { user } = useAuthContext()
  const { active_rootcollection } = useRootcollectionContext()
  const { fetchRootcollectionCollections } = useGetRootcollectionCollections()

  useEffect(() => {
    const fetchData = async () => await fetchRootcollectionCollections()
    if (user && active_rootcollection) {
      fetchData()
    }
  }, [active_rootcollection])

  return (
    <>
      <ul>
        {collections.map(collection => (
          <li key={collection._id}>{collection.name}</li>
        ))}
      </ul>
    </>
  )
}

export default TreeView