import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {
  console.log(props)
  useEffect(()=>{
    props.fetchQuiz()
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()
    props.postAnswer(props.quiz.quiz_id,props.selectedAnswer)
  }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={ props.selectedAnswer === props.quiz.answers[0].answer_id? "answer selected" : "answer"}>
                {props.quiz.answers[0].text}
                <button onClick={()=>props.selectAnswer(props.quiz.answers[0].answer_id)}>
                { props.selectedAnswer === props.quiz.answers[0].answer_id? "SELECTED" : "SELECT"}
                </button>
              </div>

              <div className={ props.selectedAnswer === props.quiz.answers[1].answer_id? "answer selected" : "answer"}>
                {props.quiz.answers[1].text}
                <button onClick={()=>props.selectAnswer(props.quiz.answers[1].answer_id)}>
                { props.selectedAnswer === props.quiz.answers[1].answer_id? "SELECTED" : "SELECT"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn"  onClick={handleSubmit} disabled={!props.selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}


export default connect(st => st, actionCreators)(Quiz)