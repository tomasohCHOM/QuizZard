export interface Question {
	prompt: string;
	correctAnswer: string;
	incorrectAnswers: string[];
}

export interface Answer {
	answer: string;
	correct: boolean;
}

export interface QuestionSet {
	answers: string[];
	prompt: string;
	correctAnswer: string;
	incorrectAnswers: string[];
}
