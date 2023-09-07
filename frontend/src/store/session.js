import { csrfFetch } from './csrf'

const GET_USER = "session/getUser"
const REMOVE_USER = "session/removeUser"

const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  })
  const data = await res.json()
  dispatch(getUser(data.user))
  return res
}

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session")
  const data = await res.json()
  dispatch(getUser(data.user))
  return res
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case GET_USER:
      newState = { ...state }
      newState.user = action.user
      return newState
    case REMOVE_USER:
      newState = { ...state }
      newState.user = null
      return newState
    default:
      return state
  }
}

export default sessionReducer
