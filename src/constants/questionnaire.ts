export interface Questionnaire {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const questionnaire: Questionnaire[] = [
  {
    id: 1,
    question: "I am allowed to ride on the back of the trolley trailer.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 2,
    question: "All accidents and incidents must be reported immediately.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 3,
    question:
      "It is acceptable to use a mobile phone while operating machinery.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 4,
    question:
      "Personal Protective Equipment (PPE) is optional in designated areas.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 5,
    question: "Fire exits should be kept clear at all times.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 6,
    question: "It is safe to lift heavy objects without proper training.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 7,
    question: "All visitors must sign in at reception.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 8,
    question: "Emergency procedures should be known by all staff.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 9,
    question: "It is acceptable to remove safety guards from machinery.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 10,
    question: "Hazardous materials should be properly labeled and stored.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 11,
    question: "Smoking is permitted in designated outdoor areas only.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 12,
    question: "It is not necessary to report near-miss incidents.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 13,
    question:
      "All employees must complete safety training before starting work.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 14,
    question: "Horseplay is acceptable in the workplace during break times.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 15,
    question: "First aid kits should be regularly checked and maintained.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 16,
    question: "It is acceptable to block fire extinguishers temporarily.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 17,
    question: "All electrical equipment should be inspected before use.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 18,
    question: "Manual handling training is only required for warehouse staff.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 19,
    question: "Emergency exits can be locked during non-working hours.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 20,
    question: "Risk assessments should be reviewed and updated regularly.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 21,
    question: "It is acceptable to use equipment without proper training.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 22,
    question: "All spills should be cleaned up immediately.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 23,
    question: "Safety signs can be ignored if you are familiar with the area.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
  {
    id: 24,
    question:
      "Employees should report any safety concerns to their supervisor.",
    options: ["True", "False"],
    correctAnswer: "True",
  },
  {
    id: 25,
    question: "It is acceptable to overload electrical outlets.",
    options: ["True", "False"],
    correctAnswer: "False",
  },
];
