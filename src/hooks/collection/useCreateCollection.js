import { useState } from "react"
import { baseUrl } from "../../data/urls"

import { useAuthContext } from "../user/useAuthContext"
import { useRootcollectionContext } from "./useRootcollectionContext"
import { useCollectionContext } from "./useCollectionContext"

export const useCreateCollection = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()
  const { active_rootcollection } = useRootcollectionContext()
  const { dispatch } = useCollectionContext()

  const createCollection = async (name) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/collections`, {
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
      dispatch({ type: 'ADD_COLLECTION', payload: { rootcollection: json } })
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }
  return { createCollection, isLoading, error }
}