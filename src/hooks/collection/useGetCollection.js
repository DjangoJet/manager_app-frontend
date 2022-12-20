import { useState } from "react"
import { baseUrl } from "../../data/urls"

import { useAuthContext } from "../user/useAuthContext"

export const useGetCollection = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [collection, setCollection] = useState(null)
  const { user } = useAuthContext()

  const fetchCollection = async (collection_id) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/collections/${collection_id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const json = await response.json()
    if (response.ok) {
      setIsLoading(false)
      setCollection(json)
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }

  return { fetchCollection, isLoading, error, collection, setCollection }
}