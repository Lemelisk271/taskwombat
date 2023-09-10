import { csrfFetch } from "./csrf";

const GET_USER = "user/getUser"

const getUser = (user) => {
  return {
    type: GET_USER,
    user
  }
}

export const getSingleUser = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${id}`)
  const data = await res.json()
  dispatch(getUser(data))
  return res
}

const initialState = {}

const userReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case GET_USER: {
      newState = { ...action.user }
      return newState
    }
    default:
      return state
  }
}

export default userReducer
