import type { Question } from "$lib/shared";

export default [
	{
		prompt: "Which of the following is NOT a real programming language?",
		correctAnswer: "Gem",
		incorrectAnswers: ["Elixir", "Lua", "Rust"]
	},
	{
		prompt:
			"List the following languages in order of release (oldest to newest).\nJava, C++, Python, JavaScript",
		correctAnswer: "C++, Python, Java, JavaScript",
		incorrectAnswers: [
			"C++, Java, Python, JavaScript",
			"C++ JavaScript, Java, Python",
			"C++, Java, JavaScript, Python"
		]
	},
	{
		prompt: "Which of the following is NOT a technology part of acmcsuf.com?",
		correctAnswer: "Java",
		incorrectAnswers: ["SvelteKit", "GraphQL", "TypeScript"]
	},
	{
		prompt: "If you apply margin on an inline element which sides will it apply to?",
		correctAnswer: "Only left and right",
		incorrectAnswers: ["Only top and bottom", "All sides", "No sides"]
	},
	{
		prompt: "Which of these is NOT an HTML Element?",
		correctAnswer: "<access>",
		incorrectAnswers: [
			"<address>",
			"<form>",
			"<dialog>"
		]
	},
	{
		prompt: "How many bytes is an unsigned short in C?",
		correctAnswer: "2",
		incorrectAnswers: ["4", "1", "8"]
	},
	{
		prompt: "In what order are margin and padding defined in CSS?",
		correctAnswer: "Top, Right, Bottom, Left",
		incorrectAnswers: [
			"Top, Bottom, Left, Right",
			"Right, Bottom, Left ,Top",
			"Left, Right, Top, Bottom"
		]
	},
	{
		prompt: "75%+ websites use...",
		correctAnswer: "PHP",
		incorrectAnswers: ["JavaScript", "jQuery", "React"]
	},
	{
		prompt: "Which of these is NOT a graph-related algorithm?",
		correctAnswer: "Kosaraju's",
		incorrectAnswers: ["Dijkstra's", "A*", "Naive Bayes"]
	},
	{
		prompt: "How many public repositories exist within the acmcsufoss org?",
		correctAnswer: "37",
		incorrectAnswers: ["29", "32", "51"]
	}
] satisfies Question[];
