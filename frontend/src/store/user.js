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

export const updateReview = (id, body) => async (dispatch) => {
  const review = await csrfFetch('/api/reviews', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  const user = await csrfFetch(`/api/users/${id}`)
  const userData = await user.json()
  dispatch(getUser(userData))
  return review
}

export const addReviewImage = (body) => async (dispatch) => {
  const { image, reviewId, userId } = body
  const formData = new FormData()
  formData.append("reviewId", reviewId)
  formData.append("userId", userId)
  formData.append("image", image)
  const reviewImage = await csrfFetch('/api/images/review', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  })
  const user = await csrfFetch(`/api/users/${userId}`)
  const userData = await user.json()
  dispatch(getUser(userData))
  return reviewImage
}

export const deleteReviewImage = (id, userId) => async (dispatch) => {
  const reviewImage = await csrfFetch(`/api/images/${id}`, {
    method: "DELETE"
  })
  const user = await csrfFetch(`/api/users/${userId}`)
  const userData = await user.json()
  dispatch(getUser(userData))
  return reviewImage
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
