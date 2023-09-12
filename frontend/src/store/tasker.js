import { csrfFetch } from "./csrf";

const GET_TASKER = "tasker/getTasker"

const getTasker = (tasker) => {
  return {
    type: GET_TASKER,
    tasker
  }
}

export const getSingleTasker = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/taskers/${id}`)
  const data = await res.json()
  dispatch(getTasker(data))
  return res
}

const initialState = {}

const TaskerReducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case GET_TASKER: {
      newState = { ...action.tasker }
      return newState
    }
    default:
      return state
  }
}

export default TaskerReducer
