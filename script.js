let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williems",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },

    {
        "question": "Was bedeutet das lateinische “carpe diem”?",
        "answer_1": "Genieße das Leben",
        "answer_2": "Nutze den Tag",
        "answer_3": "Dein Tag wird toll werden",
        "answer_4": "Man sieht sich immer zweimal im Leben",
        "right_answer": 2
    },

    {
        "question": "Welcher Pilz ist einer der giftigsten der Welt?",
        "answer_1": "Der Fliegenpilz",
        "answer_2": "Der Grüne Knollenblätterpilz",
        "answer_3": "Der Gemeine Kartoffelbovist",
        "answer_4": "Der Satansröhrling",
        "right_answer": 2
    },

    {
        "question": "Einen Feinschmecker nennt man auch?",
        "answer_1": "Gourmet",
        "answer_2": "Gourmed",
        "answer_3": "Genießer",
        "answer_4": "Leckermäulchen",
        "right_answer": 1
    },

    {
        "question": "Welches Metall leitet Wärme am besten?",
        "answer_1": "Silber",
        "answer_2": "Kupfer",
        "answer_3": "Gold",
        "answer_4": "Aluminium",
        "right_answer": 2
    }
];

let currantQuestion = 0; // 0dik helyen szereplö JSON (benne van 4 valsz, kerdes)
let page = 2;
let rightQuestions = 0;
let audio_sucess = new Audio('audio/sucess.mp3')
let audio_wrong = new Audio('audio/wrong.mp3')

function init() {
    document.getElementById("all-questions").innerHTML = questions.length;

    showQuestion()
}


function showQuestion() {
    // End Screen
    if (currantQuestion >= questions.length) {
        showEndScreen();
    } else {

        let percent = (currantQuestion + 1) / questions.length; // 1 / 5 pl.: kiszamolja a %
        percent = Math.round(percent * 100); // %ban kiszämolja es kerekiti az erteket
        document.getElementById("progress-bar").innerHTML = `${percent}%`;
        document.getElementById("progress-bar").style.width = `${percent}%`;


        let question = questions[currantQuestion] // ez lehetne questions[0] is 
        pageNumber();
        document.getElementById("question_text").innerHTML = question["question"];
        document.getElementById("answer_1").innerHTML = question["answer_1"];
        document.getElementById("answer_2").innerHTML = question["answer_2"];
        document.getElementById("answer_3").innerHTML = question["answer_3"];
        document.getElementById("answer_4").innerHTML = question["answer_4"];
    }
}

function showEndScreen() {
    document.getElementById("endScreen").style = '';
    document.getElementById("questionBody").style = 'display: none';

    document.getElementById('amount-of-question').innerHTML = questions.length;
    document.getElementById('right-question-number').innerHTML = rightQuestions;
}


// A HTML részben van az onclick="answer('answer_1') a selection pedig a zárójelben lévő részt helyettesíti
function answer(selection) {
    let question = questions[currantQuestion]; // 0dik helyen szereplö JSON (benne van 4 valsz, kerdes)
    console.log('Selected answer is', selection); // A HTML oldalrol az onclick="answer('answer_1') reszben a zarojel tartalma
    let selectedQuestionNumber = selection.slice(-1); //megmutatja a selection pl.: answer_3 az utols´karaktert ami: 3
    console.log('selectedQuestionNumber is', selectedQuestionNumber); // egy sorral fentebb^^ leirja a kikeresett karaktert
    console.log('Current question is', question['right_answer']); //question 0dik JSON, ami a rigt_answer t mutatja ami : 3


    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        console.log('Richtige Antwort!!');
        document.getElementById(selection).parentNode.classList.add('bg-success'); // Als string egy CSS klasse hinzufügen classList.add - a perentNode pedig a document.geteElement... melleti kodot jelöli ki
        rightQuestions++;
        audio_sucess.play();
    } else {
        console.log('Falsche antwort!!');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_wrong.play();
    }
    document.getElementById('next-button').disabled = false;
}


function nextQuestion() {

    currantQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();

}

function pageNumber() {
    document.getElementById('page-number').innerHTML = currantQuestion + 1;
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartGame() {
    currantQuestion = 0;
    rightQuestions = 0;
    document.getElementById("questionBody").style = '';
    document.getElementById("endScreen").style = 'display: none;';
    init();
}