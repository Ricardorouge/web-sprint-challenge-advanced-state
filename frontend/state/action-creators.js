import {
MOVE_CLOCKWISE,
INPUT_CHANGE,
MOVE_COUNTERCLOCKWISE,
RESET_FORM,
SET_INFO_MESSAGE,
SET_QUIZ_INTO_STATE,
SET_SELECTED_ANSWER, } from "./action-types"
import axios from "axios"

const URL = 'http://localhost:9000/api/quiz/next'



// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return ({type:MOVE_CLOCKWISE})
}

export function moveCounterClockwise() { 
  return ({type:MOVE_COUNTERCLOCKWISE})
}

export function selectAnswer(id) {
  return ({type:SET_SELECTED_ANSWER,payload:id})
 }

export function setMessage(message) { 
  return ({type:SET_INFO_MESSAGE, payload: message})
}

export function setQuiz(quiz) { 
  return ({type: SET_QUIZ_INTO_STATE, payload: quiz})
}

export function inputChange(input) { 
  return ({type:INPUT_CHANGE, payload:input})
}

export function resetForm() {
  return ({type: RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // dispatch(setMessage('Loading next quiz...'))
    axios.get(URL)
    .then(res=>{
      dispatch(setQuiz(res.data))
    })
    .catch(err=>{
      dispatch(setMessage(err.message))
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quiz_id,answer_id) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer',{quiz_id,answer_id})
    .then(res=>{ console.log(res)
      dispatch(selectAnswer(null))
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err=>{ 
      dispatch(setMessage(err.message))
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(question_text,true_answer_text,false_answer_text) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new',{question_text,true_answer_text,false_answer_text})
    .then(res=>{
      dispatch(setMessage(`Congrats: "${question_text}" is a great question!`))
      // dispatch(resetForm())
    })
    .catch(err=>{
      dispatch(setMessage(err.data.message))
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
