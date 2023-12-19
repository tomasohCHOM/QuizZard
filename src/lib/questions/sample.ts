import type { Question } from "$lib/shared";

export default [
	{
		prompt: "What is the square root of 16?",
		correctAnswer: "4",
		incorrectAnswers: ["16", "8", "2"]
	}
] satisfies Question[];
