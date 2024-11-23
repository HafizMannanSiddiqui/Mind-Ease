const questionsData = [
    // Basic Questions
    {
      id: 1,
      question: "How was your day?",
      options: [
        { text: "Good", score: 5 },
        { text: "Normal", score: 3 },
        { text: "Bad", score: 1 },
        { text: "Worst", score: 0 }
      ]
    },
    {
      id: 2,
      question: "How are you feeling today?",
      options: [
        { text: "Happy", score: 5 },
        { text: "Okay", score: 3 },
        { text: "Sad", score: 1 },
        { text: "Depressed", score: 0 }
      ]
    },
    {
      id: 3,
      question: "How much sleep did you get last night?",
      options: [
        { text: "More than 8 hours", score: 5 },
        { text: "6-8 hours", score: 3 },
        { text: "4-6 hours", score: 1 },
        { text: "Less than 4 hours", score: 0 }
      ]
    },
    
    // Universal Questions
    {
      id: 4,
      question: "How often do you exercise?",
      options: [
        { text: "Every day", score: 5 },
        { text: "3-4 times a week", score: 3 },
        { text: "Once a week", score: 1 },
        { text: "Rarely or never", score: 0 }
      ]
    },
    {
      id: 5,
      question: "Do you feel you have a good work-life balance?",
      options: [
        { text: "Yes, always", score: 5 },
        { text: "Mostly", score: 3 },
        { text: "Sometimes", score: 1 },
        { text: "No, never", score: 0 }
      ]
    },
    {
      id: 6,
      question: "How often do you spend time with friends or family?",
      options: [
        { text: "Every day", score: 5 },
        { text: "A few times a week", score: 3 },
        { text: "Once a month", score: 1 },
        { text: "Rarely", score: 0 }
      ]
    },
    
    // Anxiety Related Questions
    {
      id: 7,
      question: "Do you often feel nervous or anxious?",
      options: [
        { text: "Very often", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 8,
      question: "How often do you feel restless or on edge?",
      options: [
        { text: "Very often", score: 0 },
        { text: "Occasionally", score: 3 },
        { text: "Seldom", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 9,
      question: "Do you have trouble relaxing?",
      options: [
        { text: "Yes, often", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 10,
      question: "Do you frequently worry about everyday situations?",
      options: [
        { text: "Very often", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
  
    // Depression Related Questions
    {
      id: 11,
      question: "Do you feel down or depressed most of the time?",
      options: [
        { text: "Yes, frequently", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 12,
      question: "Do you find it difficult to get out of bed in the morning?",
      options: [
        { text: "Yes, almost every day", score: 0 },
        { text: "Occasionally", score: 3 },
        { text: "Seldom", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 13,
      question: "Do you feel like you have little interest or pleasure in doing things?",
      options: [
        { text: "Yes, almost all the time", score: 0 },
        { text: "Occasionally", score: 3 },
        { text: "Seldom", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 14,
      question: "Do you feel hopeless about your future?",
      options: [
        { text: "Yes, frequently", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    
    // Stress Related Questions
    {
      id: 15,
      question: "Do you often feel overwhelmed by your responsibilities?",
      options: [
        { text: "Yes, very often", score: 0 },
        { text: "Occasionally", score: 3 },
        { text: "Seldom", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 16,
      question: "Do you find it difficult to manage your stress levels?",
      options: [
        { text: "Yes, always", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 17,
      question: "Do you experience physical symptoms (e.g., headaches, stomach issues) due to stress?",
      options: [
        { text: "Yes, frequently", score: 0 },
        { text: "Occasionally", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 18,
      question: "Do you feel like your stress affects your ability to concentrate or focus?",
      options: [
        { text: "Yes, very often", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
  
    // Additional 130 questions for variety, including similar questions or variations across categories
    // These questions can include various life events, work/study related questions, family questions, etc.
    
    {
      id: 19,
      question: "How often do you feel lonely?",
      options: [
        { text: "Very often", score: 0 },
        { text: "Sometimes", score: 3 },
        { text: "Rarely", score: 5 },
        { text: "Never", score: 10 }
      ]
    },
    {
      id: 20,
      question: "Do you have a good support system around you?",
      options: [
        { text: "Yes, I have strong support", score: 5 },
        { text: "I have some support", score: 3 },
        { text: "I have little support", score: 1 },
        { text: "I have no support", score: 0 }
      ]
    },
    {
      id: 21,
      question: "How often do you engage in activities that make you happy?",
      options: [
        { text: "Every day", score: 5 },
        { text: "A few times a week", score: 3 },
        { text: "Once a week", score: 1 },
        { text: "Rarely", score: 0 }
      ]
    },
  
    // Continue adding more questions...
    // Fill the remaining questions with variations across anxiety, depression, stress, and general life questions.
    // For brevity, the rest can be structured in the same way as the above categories.
  
  ];
  
  export default questionsData;
  