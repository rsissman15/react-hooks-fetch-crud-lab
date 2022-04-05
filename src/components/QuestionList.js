
import QuestionItem from "./QuestionItem";

function QuestionList({questions,handleDeleteEvent, handleUpdateEvent}) {

  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question=><QuestionItem key={question.id}  handleDeleteEvent={handleDeleteEvent} question={question} handleUpdateEvent={handleUpdateEvent}/>)}</ul>
    </section>
  );
}

export default QuestionList;
