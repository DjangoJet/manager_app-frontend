import { useState } from "react"
import { baseUrl } from "../../data/urls"
import { useAuthContext } from "../user/useAuthContext"
import { useRootcollectionContext } from "./useRootcollectionContext"

export const useDeleteRootcollection = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()
  const { active_rootcollection, dispatch } = useRootcollectionContext()

  const deleteRootcollection = async () => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/rootcollections/${active_rootcollection._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const json = await response.json()

    if (response.ok) {
      setIsLoading(false)
      dispatch({ type: 'DELETE_ROOTCOLLECTION', payload: { rootcollection_id: active_rootcollection._id } })
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }
  return { deleteRootcollection, isLoading, error }
}