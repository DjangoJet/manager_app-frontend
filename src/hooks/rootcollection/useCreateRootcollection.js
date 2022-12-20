import { useState } from "react"
import { baseUrl } from "../../data/urls"
import { useAuthContext } from "../user/useAuthContext"
import { useRootcollectionContext } from "./useRootcollectionContext"

export const useCreateRootcollection = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useRootcollectionContext()

  const createRootcollection = async (name) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/rootcollections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ name })
    })
    const json = await response.json()
    if (response.ok) {
      setIsLoading(false)
      dispatch({ type: 'ADD_ROOTCOLLECTION', payload: { rootcollection: json } })
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }
  return { createRootcollection, isLoading, error }
}