import { createContext, useReducer } from "react";

export const CollectionContext = createContext(null)

export const collectionReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLLECTION_ACTIVITY': {
      const index = state.collections.findIndex(collection =>
        collection._id === action.payload.collection_id
      )
      const new_collections = state.collections
      new_collections[index].isActive = new_collections[index].isActive ? false : true
      return { collections: new_collections }
    }
    case 'FETCH_COLLECTIONS': {
      //const new_collections = action.payload.collections.map(collection => collection.isActive = false)
      return { collections: action.payload.collections }
    }
    case 'UPDATE_COLLECTION': {

    }
    case 'ADD_COLLECTION': {
      
    }
    case 'DELETE_COLLECTION': {
      const temp_id_array = [action.payload.collection_id]
      var new_collections = state.collections.filter(collection =>
        collection._id !== action.payload.collection_id
      )
      var isDone = true
      while (isDone) {
        var temp = []
        for (const id in temp_id_array) {
          const temp_collection = new_collections.find(collection => collection._id === id)
          temp = [...temp, ...temp_collection.childrens]
        }
        for (const id in temp) {
          const new_collections = new_collections.filter(collection => collection._id !== id)
        }
        if (temp) {
          temp_id_array = temp
        } else {
          isDone = false
        }
      }
      return { collections: new_collections }
    }
    case 'CLEAR':
      return { collections: [] }
    default:
      return state
  }
}

export const CollectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionReducer, {
    collections: []
  })

  return (
    <CollectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CollectionContext.Provider>
  )
}