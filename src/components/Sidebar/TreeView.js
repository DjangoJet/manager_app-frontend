import { useEffect } from "react"

import './TreeView.css'

import { useGetRootcollectionCollectionsMain } from "../../hooks/rootcollection/useGetRootcollectionCollectionsMain"
import { useRootcollectionContext } from "../../hooks/rootcollection/useRootcollectionContext"
import { useAuthContext } from "../../hooks/user/useAuthContext"

import TreeNode from "./TreeNode"

const TreeView = () => {
  const { user } = useAuthContext()
  const { active_rootcollection } = useRootcollectionContext()
  const { fetchRootcollectionCollectionsMain, collections } = useGetRootcollectionCollectionsMain()

  useEffect(() => {
    const fetchData = async () => await fetchRootcollectionCollectionsMain()
    if (user && active_rootcollection) {
      fetchData()
    }
  }, [active_rootcollection])

  return (
    <>
      <ul>
        {collections && collections.map(collection => (
          <TreeNode key={collection._id} collection_id={collection._id} />
        ))}
      </ul>
    </>
  )
}

export default TreeView