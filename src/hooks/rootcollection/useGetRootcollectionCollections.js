import { useState } from "react"
import { useCollectionContext } from "../collection/useCollectionContext"
import { useAuthContext } from "../user/useAuthContext"
import { useRootcollectionContext } from "./useRootcollectionContext"

import { baseUrl } from "../../data/urls"

export const useGetRootcollectionCollections = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()
  const { active_rootcollection } = useRootcollectionContext()
  const { dispatch } = useCollectionContext()

  const fetchRootcollectionCollections = async () => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/rootcollections/collections/${active_rootcollection._id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const json = await response.json()
    if (response.ok) {
      setIsLoading(false)
      dispatch({ type: 'FETCH_COLLECTIONS', payload: { collections: json } })
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }
  return { fetchRootcollectionCollections, isLoading, error }
}