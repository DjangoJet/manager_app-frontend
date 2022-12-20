import { useContext } from "react"
import { RootcollectionContext } from "../../context/RootcollectionContext"

export const useRootcollectionContext = () => {
  const context = useContext(RootcollectionContext)

  if (!context) {
    throw Error('useRootcollectionContext must be used inside an RootcollectionContextProvider')
  }

  return context
}