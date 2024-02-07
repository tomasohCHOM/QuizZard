import type { Question } from "$lib/shared";

export default [
	{
		prompt: "Let u = <2, 0, 7> and v = <-3, -4, 0>, what is 8(u x v)",
		correctAnswer: "<224, -168, -64>",
		incorrectAnswers: ["<28, -21, -8>", "<-224, 168, 64>", "-8"]
	},
	{
		prompt: "Assume a, b, and c are vectors. What if we simplified a · (b · c)?",
		correctAnswer: "This does not make sense",
		incorrectAnswers: ["A scalar", "A vector"]
	},
	{
		prompt:
			"Find the area of the parallelogram by PQ and PR where P = (-3, 3, -5), Q = (-1, -3, 0) and R = (1, 5, -5)",
		correctAnswer: "sqrt(1284)",
		incorrectAnswers: ["4sqrt(321)", "sqrt(321)", "sqrt(58)"]
	},
	{
		prompt: "Find the equation of line L passing through P(6, -7, -8) and Q(-1, 3, 6)",
		correctAnswer: "r(t) = <6, -7, -8> + t<-7, 10, 14>",
		incorrectAnswers: [
			"r(t) = <-7, 10, 14> + t<6, -7, -8>",
			"r(t) = <-1, 3, 6> + t<7, -10, -14>",
			"r(t) = <6, -7, -8> + t <-1, 3, 6>"
		]
	},
	{
		prompt: "Find the point at which r(t) = <-5, 1, -8> + t<7, 1, 5> intersects the yz-plane",
		correctAnswer: "(0, 2/7, -31/7)",
		incorrectAnswers: ["(7, 0, 4)", "(0, 5/7, 12/7)", "(0, -31/7, 2/7)"]
	}
] satisfies Question[];
