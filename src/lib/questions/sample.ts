import type { Question } from "$lib/shared";

export default [
	{
		prompt: "What is the square root of 16?",
		correctAnswer: "4",
		incorrectAnswers: ["16", "8", "2"]
	},
	{
		prompt: "The dot product of <2, 4> . <5, 8> is:",
		correctAnswer: "42",
		incorrectAnswers: ["18", "25", "48"]
	},
	{
		prompt: "The derivative of 3x - 7 in terms of y is:",
		correctAnswer: "0",
		incorrectAnswers: ["3", "7", "-4"]
	}
] satisfies Question[];
