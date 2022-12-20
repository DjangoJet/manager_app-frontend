import { useContext } from "react"
import { CollectionContext } from "../../context/CollectionContext"

export const useCollectionContext = () => {
  const context = useContext(CollectionContext)

  if (!context) {
    throw Error('useCollectionContext must be used inside an CollectionContextProvider')
  }

  return context
}