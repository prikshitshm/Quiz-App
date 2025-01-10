const questions =[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text:"Shark", correct:false},
            {text:"Lion",correct:false},
            {text:"Elephant",correct:true},
            {text:"Bird", correct:false}
        ]
    },
    {
        question:"Which is the largest Country in the world?",
        answers:[
            {text:"Russia", correct:true},
            {text:"India",correct:false},
            {text:"USA",correct:false},
            {text:"Japan", correct:false}
        ]
    },
    {
        question:"Where is Baba ka Dhaba?",
        answers:[
            {text:"Chennai", correct:false},
            {text:"Chandigarh",correct:false},
            {text:"Kerala",correct:false},
            {text:"Delhi", correct:true}
        ]
    }

]

const questionElement = document.getElementById('question')

const answerButtons = document.getElementById('answer-buttons')

const nextButton = document.getElementById('next-btn')


let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion()
}


function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex]
     let questionNo = currentQuestionIndex+1;

     questionElement.innerHTML= questionNo + ". " + currentQuestion.question

     currentQuestion.answers.forEach( answer =>{
        const button = document.createElement('button')
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerButtons.appendChild(button)
         if(answer.correct){
            button.dataset.correct = answer.correct
         }
        button.addEventListener('click',selectAnser)
     })
}


function resetState(){
    nextButton.style.display='none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)

    }
}

function selectAnser(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct ==='true';

    if(isCorrect){
        selectedBtn.classList.add('correct')
        score++

    }
    else{
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    });
    nextButton.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
 nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
 })
function showScore(){
    resetState();
    questionElement.innerHTML= `You Scored ${score} out of ${questions.length}`
    nextButton.innerHTML='Play Again'
    nextButton.style.display='block'
}
startQuiz(); 