import type { Question } from "$lib/shared";

export default [
	{
		prompt: "Which of the following is NOT a real programming language?",
		correctAnswer: "Gem",
		incorrectAnswers: ["Elixir", "Lua", "Rust"]
	},
	{
		prompt:
			"List the following languages in order of release (oldest to newest).\nJava, C++, C#, JavaScript",
		correctAnswer: "C++, Java, JavaScript, C#",
		incorrectAnswers: [
			"C++, Java, C#, JavaScript",
			"Java, C++, C#, JavaScript",
			"C++, JavaScript, Java, C#"
		]
	},
	{
		prompt: "Which of the following is NOT a technology part of acmcsuf.com?",
		correctAnswer: "Java",
		incorrectAnswers: ["SvelteKit", "GraphQL", "TypeScript"]
	},
	{
		prompt: "How many threads does JavaScript code run in?",
		correctAnswer: "1",
		incorrectAnswers: ["2", "8", "no set number"]
	},
	{
		prompt: "If you apply margin on an inline element which sides will it apply to?",
		correctAnswer: `Only left and right`,
		incorrectAnswers: [`Only top and bottom`, `All sides`, `No sides`]
	},
	{
		prompt: "Which of these is true about visibility: hidden in CSS?",
		correctAnswer: "It occupies space",
		incorrectAnswers: [
			"It can still be clicked on",
			"It is removed from layout flow",
			"It is the same as opacity: 0"
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
		prompt:
			"React StrictMode helps find unintentional side effects by double invoking certain functions. Which of the following functions is not double invoked by StrictMode?",
		correctAnswer: "Functions passed to useEffect",
		incorrectAnswers: [
			"Function components",
			"Functions passed to useState",
			"Class component constructors"
		]
	},
	{
		prompt: "Which of these creates a stacking context in CSS?",
		correctAnswer: "position: sticky",
		incorrectAnswers: ["opacity: 1", "z-index: 10", "order: 4"]
	}
] satisfies Question[];
