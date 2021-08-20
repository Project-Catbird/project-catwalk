import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionComponent from './QuestionComponent.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import { useState } from 'react';
import '../../../dist/styles/questionsAnswers/QuestionAnswer.css';
export default props => {

  const questions = useSelector(state => {
    return ( state.questions )
  });


  //***********************SEARCH_BAR ******************************//
  const filterQuestions = (questions, query) => {
    if (!query || query.length < 3) {
      return questions;
    }
    return questions.filter((question) => {
      const postName = question.question_body.toLowerCase();
      return postName.includes(query);
    });
  };
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');


  //*******************************************************************//


  //empty arrays that will store questions and sliced questions by count
  var questionsArray = [] ;
  var slicedQuestionArray = [];
  var questionTotal = questions.results.length;
  //push all result into QuestionArray list
  for (var i = 0; i < questionTotal; i++){
    questionsArray.push(questions.results[i])
  }

  //choose the first 4 questions only from QuestionArray list
  //initial default question is 4
  const [questionCount, setquestionCount] = useState(4);
  const getMoreQuestions = () => {
    if (questionCount < questionTotal - 2) {
      setquestionCount(questionCount + 2);
    //if the question count reaches max or total questions
    } else if (questionCount >= questionTotal - 2) {
      setquestionCount(questionCount + 2);
      const moreQuestionButton = document.querySelector('#qa-more-button')
      moreQuestionButton.classList.add('disable')
    }
  };

  slicedQuestionArray = questionsArray.slice(0,questionCount);
  const filteredQuestions = filterQuestions(slicedQuestionArray, searchQuery);

  return (
    <div id='question-list'>
      <div id='question-list-top'>
      <SearchQuestions
        searchQuery={searchQuery}
        setSearchQuery = {setSearchQuery} />
        <AddQuestion />
      </div>
      <div id='question-list-mid'>
        {filteredQuestions.map((question, i) => {
          return (
            <QuestionComponent question={question} key={i} />
        )})}
      </div>
      <div id='question-list-bottom'>
        <button id='qa-more-button' className={questionTotal <= 2 ? 'disable' : ''} onClick={getMoreQuestions}>More Questions</button>
      </div>
    </div>
  )

};