import type { Question } from "$lib/shared";

export default [
	{
		prompt: "Given f(x, y) = 8√(2x⁵ + 5y + xy⁶), find the partial derivative in x",
		correctAnswer: "4(10x⁴ + y⁶)/√(2x⁵ + 5y + xy⁶)",
		incorrectAnswers: [
			"8(10x⁴ + y⁶)/√(2x⁵ + 5y + xy⁶)",
			"4(10x⁴)/√(2x⁵ + 5y + xy⁶)",
			"(10x⁴ + y⁶)/√(2x⁵ + 5y + xy⁶)"
		]
	},
	{
		prompt: "Let f(x, y) = 7e⁹ˣsin(5y), find the partial derivative in y",
		correctAnswer: "35e⁹ˣcos(5y)",
		incorrectAnswers: ["-35e⁹ˣsin(5y)", "63e⁹ˣcos(5y)", "-35e⁹ˣcos(5y)"]
	},
	{
		prompt: "Give f(x, y) = √(3x² + 3y²), find fx(2, -3)",
		correctAnswer: "6/√39",
		incorrectAnswers: ["3/√39", "4/√39", "2/√39"]
	},
	{
		prompt: "Generally for 250A, fxy = fyx",
		correctAnswer: "True",
		incorrectAnswers: ["False"]
	},
	{
		prompt: "Given f(x, y) = x⁵ - x²y² + 5y⁴, find fxy",
		correctAnswer: "-4xy",
		incorrectAnswers: ["5x⁴ - 4xy", "5x⁴ -2xy² + 20y³", "-2xy² + 5y⁴"]
	},
	{
		prompt: "What is the order of doing fxxyz?",
		correctAnswer: "x, x, y, z",
		incorrectAnswers: ["z, y, x, x", "y, z, x, x", "x, x, z, y"]
	},
	{
		prompt: "Is Tomas the BEST SI leader",
		correctAnswer: "Yes",
		incorrectAnswers: ["No"]
	}
] satisfies Question[];
