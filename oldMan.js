// oldMan.js

const questions = [
    {
      question: "¿Qué es el respeto a la institucionalidad democrática?",
      options: [
        "Ignorar las leyes",
        "Aceptar y cumplir las normas y leyes del sistema democrático",
        "Protestar contra el gobierno",
        "Votar solo cuando te convenga"
      ],
      correctAnswer: 1
    },
    // Añade más preguntas aquí
  ];
  
  const oldManImg = new Image();
  oldManImg.src = './img/oldMan/Idle.png';
  
  class OldMan extends Character {
    constructor(options) {
      super(options);
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.isAskingQuestion = false;
    }
  
    askQuestion() {
      if (this.currentQuestionIndex < this.questions.length) {
        const question = this.questions[this.currentQuestionIndex];
        this.dialogue = [
          question.question,
          ...question.options.map((option, index) => `${index + 1}. ${option}`)
        ];
        this.isAskingQuestion = true;
      } else {
        this.dialogue = ['¡Felicidades! Has respondido todas las preguntas.'];
        this.isAskingQuestion = false;
      }
    }
  
    checkAnswer(selectedIndex) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      if (selectedIndex === currentQuestion.correctAnswer) {
        this.dialogue = ['¡Correcto! Muy bien.'];
      } else {
        this.dialogue = ['Lo siento, esa no es la respuesta correcta.'];
      }
      this.currentQuestionIndex++;
      this.isAskingQuestion = false;
      if (this.currentQuestionIndex < this.questions.length) {
        this.dialogue.push('Presiona espacio para la siguiente pregunta.');
      } else {
        this.dialogue.push('Has completado todas las preguntas. ¡Gracias por participar!');
      }
    }
  }
  
  const oldMan = new OldMan({
    position: {
      x: 500, // posición x
      y: 500  // posición y
    },
    image: oldManImg,
    frames: {
      max: 4,
      hold: 60
    },
    scale: 3,
    dialogue: ['¡Holaaaaaa!, Veo que has venido a aprender más sobre el respeto a la institucionalidad democrática. ¿Estás listo para responder algunas preguntas?']
  });
  
  export { oldMan };
  