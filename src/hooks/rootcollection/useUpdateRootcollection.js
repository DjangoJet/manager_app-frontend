import { useState } from "react"
import { baseUrl } from "../../data/urls"
import { useAuthContext } from "../user/useAuthContext"
import { useRootcollectionContext } from "./useRootcollectionContext"

export const useUpdateRootcollection = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()
  const { active_rootcollection, dispatch } = useRootcollectionContext()

  const updateRootcollection = async (name) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/rootcollections/${active_rootcollection._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ name })
    })
    const json = await response.json()
    if (response.ok) {
      setIsLoading(false)
      dispatch({ type: 'UPDATE_ROOTCOLLECTION', payload: { rootcollection: json } })
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }
  return { updateRootcollection, isLoading, error }
}