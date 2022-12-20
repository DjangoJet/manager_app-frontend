import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useRootcollectionContext } from "../rootcollection/useRootcollectionContext"

import { baseUrl } from "../../data/urls"

export const useGetUserRootcollections = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user } = useAuthContext()
  const { dispatch } = useRootcollectionContext()

  const fetchUserRootcollections = async () => {
    setIsLoading(true)
    setError(null)
    const response = await fetch(`${baseUrl}/rootcollections`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({
        type: 'FETCH_ROOTCOLLECTIONS', payload: {
          active_rootcollection: json[0], rootcollections: json
        }
      })
      setIsLoading(false)
    } else {
      setIsLoading(false)
      setError(json.error)
    }
  }
  return { fetchUserRootcollections, isLoading, error }
}