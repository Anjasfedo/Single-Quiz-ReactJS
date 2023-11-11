import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [questions, setQuestions] = useState({
    question: '',
    correctAnswer: '',
    incorrectAnswers: '',
    answers: ''
  })

  // const [noQuestion, setNoQuestion] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const [userAnswer, setUserAnswer] = useState('')

  const getQuestion = () => {
    axios
    .get('https://the-trivia-api.com/v2/questions/')
    .then(response => {
      setQuestions({
        question: response.data[0].question.text,
        correctAnswer: response.data[0].correctAnswer,
        incorrectAnswers: response.data[0].incorrectAnswers,
        answers: [...response.data[0].incorrectAnswers, response.data[0].correctAnswer]
      })
      setIsLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
    });
  }

  useEffect(() => {
    getQuestion()
  }, [])

  const handleUserAnswer = (event) => {
    setUserAnswer(event.target.value)
  }

  const submitAnswer = () => {
    if(questions.correctAnswer === userAnswer){
      alert('Yeayy!!! Your Answer Correct!!')
    } else {
      alert('Sorry Your Answer is Incorrect:(')
    }
  }

  return (
    <>
      <div className='bg-gray-100 h-full flex justify-center items-center text-gray-800'>
        <div className='bg-gray-200 border-2 border-stone-950 rounded-lg h-5/6 w-5/6 flex flex-col p-8'>
          <div className='basis-2/5 p-4 flex justify-center items-center'>
            {isLoading ? (
              <p className='text-2xl font-bold'>
              Loading..
            </p>
            ) : (
              <p className='text-2xl font-bold'>
              {questions.question}
            </p>
            )}
          </div>
          {isLoading ? (
            <div className='flex flex-col gap-8 basis-2/5 px-8 font-semibold'>
              <label htmlFor="answer" className='flex gap-4 text-xl'>
                <input type="checkbox" name="answer" id="" className='w-8' />
                <span>Loading..</span>
              </label>
              <label htmlFor="" className='flex gap-4 text-xl'>
                <input type="checkbox" name="answer" id="" className='w-8' />
                <span>Loading..</span>
              </label>
              <label htmlFor="" className='flex gap-4 text-xl'>
                <input type="checkbox" name="answer" id="" className='w-8' />
                <span>Loading..</span>
              </label>
              <label htmlFor="" className='flex gap-4 text-xl'>
                <input type="checkbox" name="answer" id="" className='w-8' />
                <span>Loading..</span>
              </label>
            </div>
          ) : (
            <div className='flex flex-col gap-8 basis-2/5 px-8 font-semibold'>
              {questions.answers.map((ele, index) => (
                <label htmlFor={index} key={index} className='flex gap-4 text-xl'>
                  <input type="checkbox" name="answer" id={index} className='w-8' value={ele} onChange={handleUserAnswer} checked={userAnswer === ele}/>
                  <span>{ele}</span>
                </label>
              ))}
            </div>
          )}
          <div className='flex justify-end basis-1/5 text-xl font-bold'>
            <button onClick={submitAnswer} className='border-2 bg-cyan-600 rounded-md px-4 py-2 h-fit justify-self-end'>Answer</button>
            <button className='border-2 bg-red-600 rounded-md px-4 py-2 h-fit justify-self-end' onClick={getQuestion}>Change Question</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
