import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp=>resp.json())
    .then(data => setQuestions(data))
  }, [])

  function handleDeleteEvent(id) {
    // console.log(id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method : "DELETE"
    })

    const deletedList = questions.filter(question => question.id !== id)
    setQuestions(deletedList)
  }
  
 
  function handleAddQuestion(newItem){
    setPage([...page,newItem])

  }

  function handleUpdateEvent(id, value) {
    // console.log(id)
    // console.log(value)
  fetch(`http://localhost:4000/questions/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type" : "application/json"
  },
  body: JSON.stringify({
    "correctIndex": value
    })
  })
  .then(resp=>resp.json()).then((question) => {
    console.log(question)
    //find index of item
    const updatedAnswer = question.correctIndex
    console.log(updatedAnswer)
    //use spread operator to create a copy of the questions array
    const updatedQuestions = [ ...questions ]
    //replace index of the copy with the new question
    updatedQuestions.map(question => {
      if(question.id === id) {
        question.correctIndex = updatedAnswer
      } else {
        return true
      }
    })
    //use setQuestions to update the questions
    setQuestions(updatedQuestions)
  }
  )
}




  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} handleUpdateEvent={handleUpdateEvent} handleDeleteEvent={handleDeleteEvent}/>}
    </main>
  );
}

export default App;
