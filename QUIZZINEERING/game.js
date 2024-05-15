const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};




let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions = [
  
  {
    question: "What is software design?",
    choice1: "The process of writing code to create a software application.",
    choice2: "The process of identifying requirements and defining the architecture, components, interfaces, and other characteristics of a software system.",
    choice3: "The process of testing and debugging software to ensure it functions correctly.",
    choice4: "The process of marketing and selling software products to customers.",
    answer: 2

  },
  {
    question:
      "What is the difference between agile and waterfall software development methodologies?",
    choice1: "Agile focuses on iterative development and continuous feedback, while waterfall follows a linear, sequential approach.",
    choice2: "Waterfall focuses on iterative development and continuous feedback, while agile follows a linear, sequential approach.",
    choice3: "Agile emphasizes documentation and comprehensive planning, while waterfall relies on adaptability and flexibility.",
    choice4: "Waterfall emphasizes documentation and comprehensive planning, while agile relies on adaptability and flexibility.",
    answer: 1
  },
  {
    question: " What is the role of a software architect in the software development process?",
    choice1: "To write code and implement software features according to specifications.",
    choice2: "To manage project timelines and budgets.",
    choice3: "To design the overall structure and architecture of a software system.",
    choice4: "To conduct user testing and gather feedback on software usability.",
    answer: 3
  },
  {
    question:"What is corrective maintenance in the context of software maintenance?",
    choice1: "Corrective maintenance involves enhancing the functionality of a software system to meet changing user requirements.",
    choice2: "Corrective maintenance focuses on fixing defects or errors discovered during testing or use of the software.",
    choice3: "orrective maintenance involves updating the software to ensure compatibility with new hardware or software platforms.",
    choice4: "Corrective maintenance prioritizes optimizing the performance of a software system to improve efficiency and speed.",
    answer: 2
  },
  {
   question:"What is coupling in software design?",
   choice1:" The level of dependency between different modules.",
   choice2:"The ability to hide implementation details.",
   choice3:"The process of grouping related code.",
   choice4:"The process of testing individual units of code.",
   answer : 1
  },
  {
    question:"What is DevOps in software development?",
    choice1:"Separating development and operations processes. ",
    choice2:"Combining development and operations to streamline and automate processes",
    choice3:" An approach focused solely on development.",
    choice4:"An approach focused solely on operations.",
    answer : 2
    
   },
   {
    question:"What is feedback in user interface design?",
    choice1:" Disregard user input and preferences.",
    choice2:"Providing clear and immediate responses to user actions.",
    choice3:"Offering minimal interaction cues to the user.",
    choice4:"Using complex forms of user interaction",
    answer : 2
   },
   {
    question:"Which approach is beneficial for improving user satisfaction in interface design?",
    choice1:"Focusing solely on aesthetics without considering functionality.",
    choice2:"Using consistent and predictable interactions",
    choice3:"Using complex and non-intuitive navigation paths.",
    choice4:"take no notice of user feedback and preferences.",
    answer : 2
   },
   {
    question:"Who is responsible for setting project goals and objectives?",
    choice1:" The project team members.",
    choice2:"The project manager and key stakeholders.",
    choice3:"The project manager.",
    choice4:"The clients or customers.",
    answer : 2
   },
   {
    question:"Which approach is often used for managing complex software projects?",
    choice1:"Linear or sequential methods.",
    choice2:" Agile methodologies such as Scrum or Kanban",
    choice3:"Skip methodologies and relying on experience.",
    choice4:"Ad hoc planning without structure.",
    answer : 2
   },
   {
    question:"When is the best time to conduct user acceptance testing during software implementation?",
    choice1:"At the very beginning of the project.",
    choice2:"Continuously throughout the project.",
    choice3:"After the software has been developed and tested internally.",
    choice4:"At any random point during development",
    answer : 3
   },
   {
    question:"Which approach can help minimize implementation risks?",
    choice1:" Ignoring potential risks and focusing solely on deployment.",
    choice2:"Relying solely on the end-user for testing.",
    choice3:"Skipping the testing phase.",
    choice4:"Using a phased or incremental implementation approach.",
    answer : 4
   },
   {
    question:" What is software deployment?",
    choice1:"Writing new code to improve performance.",
    choice2:"Releasing and distributing software to users.",
    choice3:"Developing software requirements.",
    choice4:"Designing the software user interface.",
    answer : 2
   },
   {
    question:"When performing regression testing, how should testers approach test case selection?",
    choice1:" By randomly selecting test cases without a specific strategy.",
    choice2:"By minimizing the number of test cases to save time",
    choice3:"By only testing new features and ignoring existing functionality.",
    choice4:"By prioritizing test cases based on the risk and criticality of changes.",
    answer : 4
   },
   {
    question:"How can quality assurance teams handle parallel testing challenges?",
    choice1:"By avoiding parallel testing due to complexity.",
    choice2:"By effectively isolating test environments to avoid interference.",
    choice3:"By running all tests sequentially to ensure accuracy",
    choice4:"By ignoring issues related to parallel testing",
    answer : 2
   },
   {
    question:"What is the best approach for testing complex user interfaces in software?",
    choice1:"Focusing solely on individual elements without considering their interactions.",
    choice2:"Using the same test cases regardless of interface complexity.",
    choice3:"Conducting exploratory testing to identify unexpected behaviors.",
    choice4:"set aside accessibility considerations during testing.",
    answer : 3
   },
   {
    question:"Which of the following is an important aspect of corrective maintenance?",
    choice1:"Adding new features to the software.",
    choice2:" Identifying and fixing software defects or bugs.",
    choice3:"Disregard user-reported issues.",
    choice4:"Relying on automated fixes without manual intervention.",
    answer : 2
   },
   {
    question:"What should maintenance teams do to ensure security during software maintenance?",
    choice1:"Ignoring security updates and patches.",
    choice2:"Relying solely on antivirus software for security",
    choice3:"Applying security patches promptly and monitoring for vulnerabilities.",
    choice4:"bypass older versions of software that may have security risks",
    answer : 3
   }, 
   {
    question:"What is a common challenge in performance optimization during software maintenance?",
    choice1:"Ignoring performance metrics in favor of adding new features.",
    choice2:"Balancing optimization with preserving existing functionality.",
    choice3:"Prioritizing performance over security concerns.",
    choice4:"Conducting optimization without considering user impact.",
    answer : 2
   },
   {
    question:" Which approach can help maintenance teams reduce the risk of data loss?",
    choice1:" depending solely on manual backups without automation.",
    choice2:"Implementing robust data backup and restoration plans",
    choice3:"pass over the data backup and recovery processes.",
    choice4:"Only backing up data after major updates",
    answer : 2
   }


];


//CONSTANTS
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame();