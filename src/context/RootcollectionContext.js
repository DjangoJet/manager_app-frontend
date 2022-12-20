import { createContext, useReducer } from "react";

export const RootcollectionContext = createContext(null)

export const rootcollectionReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_ROOTCOLLECTION': {
      return {
        active_rootcollection: state.rootcollections.find(rootcollection => (
          rootcollection._id === action.payload.rootcollection_id
        )),
        rootcollections: state.rootcollections
      }
    }
    case 'FETCH_ROOTCOLLECTIONS': {
      if (state.active_rootcollection) {
        return {
          active_rootcollection: state.active_rootcollection,
          rootcollections: action.payload.rootcollections
        }
      } else {
        return {
          active_rootcollection: action.payload.rootcollections[0],
          rootcollections: action.payload.rootcollections
        }
      }
    }
    case 'DELETE_ROOTCOLLECTION': {
      const new_rootcollections = state.rootcollections.filter(rootcollection =>
        rootcollection._id !== action.payload.rootcollection_id
      )
      const new_active_rootcollection = state.active_rootcollection._id === action.payload.rootcollection_id ? (
        new_rootcollections[0]
      ) : (
        state.active_rootcollection
      )
      return {
        active_rootcollection: new_active_rootcollection,
        rootcollections: new_rootcollections
      }
    }
    case 'ADD_ROOTCOLLECTION': {
      return {
        active_rootcollection: action.payload.rootcollection,
        rootcollections: [...state.rootcollections, action.payload.rootcollection]
      }
    }
    case 'UPDATE_ROOTCOLLECTION': {
      const new_rootcollections = state.rootcollections
      const index = new_rootcollections.findIndex(rootcollection => (
        rootcollection._id === action.payload.rootcollection._id
      ))
      new_rootcollections[index] = action.payload.rootcollection
      return {
        active_rootcollection: state.active_rootcollection,
        rootcollections: new_rootcollections
      }
    }
    case 'CLEAR': {
      return {
        active_rootcollection: '',
        rootcollections: []
      }
    }
    default: {
      return state
    }
  }
}

export const RootcollectionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootcollectionReducer, {
    active_rootcollection: '',
    rootcollections: []
  })

  return (
    <RootcollectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RootcollectionContext.Provider>
  )
}