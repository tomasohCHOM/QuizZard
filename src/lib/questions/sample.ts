import type { Question } from "$lib/shared";

export default [
	{
		prompt:
			"A sphere passes through (1,0, −3) with the center (2, −2, −5). a) Find the equation of the sphere.",
		correctAnswer: "(x - 2)^2 + (y + 2)^2 + (z + 5)^2 = 9",
		incorrectAnswers: [
			"(x - 2)^2 + (y + 2)^2 + (z + 5)^2 = 3",
			"x^2 + y^2 + z^2 = 3",
			"(x + 2)^2 + (y - 2)^2 + (z - 2)^2 = 9"
		]
	},
	{
		prompt:
			"Which of the points A(-4, 0, -1), B(3, 1, 5), and C(2, 4, 6) is closest to the yz-plane?",
		correctAnswer: "C",
		incorrectAnswers: ["A", "B"]
	},
	{
		prompt: "Identify the equation of the plane shown on the board",
		correctAnswer: "x = 6",
		incorrectAnswers: ["y = 6", "z = 6", "None of these are correct"]
	},
	{
		prompt: "Identify the equation of the plane shown on the board",
		correctAnswer: "z = 0",
		incorrectAnswers: ["x = 0", "y = 0", "x + y + z = 0"]
	}
] satisfies Question[];
