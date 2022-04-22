import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    const newInput = {...props.form,[evt.target.id]:evt.target.value}
    props.inputChange(newInput)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz(props.form.newQuestion,props.form.newTrueAnswer,props.form.newFalseAnswer
    )
  }
  const disable = props.form.newQuestion.trim().length>1 && props.form.newTrueAnswer.trim().length > 1 && props.form.newFalseAnswer.trim().length > 1 
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled = {!disable}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
