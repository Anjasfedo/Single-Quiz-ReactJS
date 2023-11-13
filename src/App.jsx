import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // Initiate questions object that storing data for questions.
  const [questions, setQuestions] = useState({
    question: '',
    correctAnswer: '',
    incorrectAnswers: [],
    answers: []
  });

  // Initiate isLoading for doing loading state.
  const [isLoading, setIsLoading] = useState(true);

  // Initiate userAnswer for input answer by user.
  const [userAnswer, setUserAnswer] = useState('');

  // Method to get data question form the trivia api and changing isLoading state.
  const getQuestion = () => {
    const randomIndex = Math.floor(Math.random() * 5)
    setIsLoading(true);
    axios
      .get('https://the-trivia-api.com/v2/questions/')
      .then(response => {
        setQuestions({
          question: response.data[randomIndex].question.text,
          correctAnswer: response.data[randomIndex].correctAnswer,
          incorrectAnswers: response.data[randomIndex].incorrectAnswers,
          answers: [...response.data[randomIndex].incorrectAnswers, response.data[0].correctAnswer].sort(() => Math.random() - 0.5)
        })
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      });
  }

  // Do getQuestion method when web rendered using useEffect.
  useEffect(() => {
    getQuestion()
  }, []);

  // Handler for changing user answer value.
  const handleUserAnswer = (event) => {
    setUserAnswer(event.target.value)
  };

  // Methor for submit the answer. And check if user answer is same with the correct answer.
  const submitAnswer = () => {
    if (!userAnswer) {
      alert('Please Select Your Answer');
    } else if (userAnswer === questions.correctAnswer) {
      alert('Yeayy!!! Your Answer Correct!!');
      getQuestion();
    } else {
      alert('Sorry Your Answer is Incorrect:(');
    }
  };

  return (
    <>
      <div className='bg-gray-700 h-full flex justify-center items-center text-gray-800'>
        <div className='bg-gray-100 border-4 border-stone-950 rounded-lg h-5/6 w-5/6 flex flex-col p-8'>
          {isLoading ? (
            <>
              <div className='basis-2/5 p-4 flex justify-center items-center'>
                <p className='text-2xl font-bold'>
                  Loading..
                </p>
              </div>
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
            </>
          ) : (
            <>
              <div className='basis-2/5 p-4 flex justify-center items-center'>
                <p className='text-2xl font-bold'>
                  {questions.question}
                </p>
              </div>
              <div className='flex flex-col gap-8 basis-2/5 px-8 font-semibold'>
                {questions.answers.map((ele, index) => (
                  <label htmlFor={index} key={index} className='flex gap-4 text-xl'>
                    <input type="checkbox" name="answer" id={index} className='w-8 focus:outline-none ' value={ele} onChange={handleUserAnswer} onKeyPress={(e) => { if (e.key === 'Enter') { submitAnswer() } }} />
                    <span className='hover:text-blue-900'>{ele}</span>
                  </label>
                ))}
              </div>
            </>
          )}
          <div className='flex justify-end items-end basis-1/5 gap-5 text-xl font-bold text-white'>
            <button onClick={submitAnswer} className='border-2 border-black bg-cyan-600 rounded-md px-4 py-2 h-fit justify-self-end hover:bg-cyan-900 hover:text-black'>Answer</button>
            <button onClick={getQuestion} className='border-2 border-black bg-red-600 rounded-md px-4 py-2 h-fit justify-self-end hover:bg-red-900 hover:text-black'>Change Question</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
