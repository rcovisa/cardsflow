const projectDescription = document.getElementById('projectDescription');
const startButton = document.getElementById('startButton');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const nextButton = document.getElementById('nextButton');
const downloadPdfButton = document.getElementById('downloadPdfButton');
const answeredQuestionsContainer = document.getElementById('answeredQuestions');

let currentQuestionIndex = 0;
let projectResponses = [];

const questions = [
    "¿De que trata tu proyecto?",
    "¿Cuál es el problema principal que tu proyecto intenta resolver?",
    "¿Quién es tu público objetivo?",
    "¿Cuáles son las características únicas de tu proyecto?",
    "¿Tienes planes para mentizar tu producto?",
    "¿Cuáles son los mayores problemas que anticipas?",
    "¿Qué recursos necesitas para llevar a cabo tu proyecto?",
    "¿Cómo medirás el éxito de tu proyecto?",
    "¿Hay competidores en el mercado? ¿Cómo te diferencias?",
    "¿Cuál es tu plan para lanzar y promocionar el proyecto?",
    "¿Cómo planeas escalar tu proyecto en el futuro?"
];

startButton.addEventListener('click', () => {
    if (projectDescription.value.trim() !== '') {
        startButton.style.display = 'none';
        questionContainer.style.display = 'block';
        downloadPdfButton.style.display = 'block';
        
        const response = {
            question: "Nombre de tu proyecto",
            answer: projectDescription.value.trim(),
            datetime: new Date().toLocaleString()
        };
        projectResponses.push(response);
        displayAnsweredQuestion(response);
        
        showNextQuestion();
    } else {
        alert('Por favor, describe tu proyecto antes de empezar.');
    }
});

nextButton.addEventListener('click', () => {
    if (answerElement.value.trim() !== '') {
        saveAnswer();
        answerElement.value = '';
        showNextQuestion();
    } else {
        alert('Por favor, responde la pregunta antes de continuar.');
    }
});

downloadPdfButton.addEventListener('click', generatePDF);

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        questionElement.textContent = questions[currentQuestionIndex];
        currentQuestionIndex++;
    } else {
        questionContainer.innerHTML = '<h2>¡Felicidades! Has completado todas las preguntas.</h2>';
    }
}

function saveAnswer() {
    const response = {
        question: questions[currentQuestionIndex - 1],
        answer: answerElement.value.trim(),
        datetime: new Date().toLocaleString()
    };
    projectResponses.push(response);
    displayAnsweredQuestion(response);
}

function displayAnsweredQuestion(response) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'answered-question';
    questionDiv.innerHTML = `
        <h3>${response.question}</h3>
        <p>${response.answer}</p>
        <p class="datetime">${response.datetime}</p>
    `;
    answeredQuestionsContainer.appendChild(questionDiv);
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(16);
    doc.text("Resumen del Proyecto", 105, yPos, null, null, 'center');
    yPos += 10;

    doc.setFontSize(12);
    projectResponses.forEach((response, index) => {
        if (yPos > 280) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFont(undefined, 'bold');
        doc.text(`${index + 1}. ${response.question}`, 10, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        const lines = doc.splitTextToSize(response.answer, 190);
        doc.text(lines, 10, yPos);
        yPos += lines.length * 7;
        doc.setFont(undefined, 'italic');
        doc.text(`Fecha y hora: ${response.datetime}`, 10, yPos);
        yPos += 10;
    });

    doc.save("resumen_proyecto.pdf");
}
