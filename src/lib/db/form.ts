interface VerifierResponse {
	quizName: string | null;
	quizSet: any;
	fails: string[] | null;
}

export function verifyQuizForm(data: FormData): VerifierResponse {
	const quizName = data.get("quiz-name") as string;
	const fails: string[] = [];

	if (quizName === "") {
		fails.push("Quiz name is missing.");
	}

	const quizSet = [];

	for (let i = 0; data.get(`question-prompt-${i}`) != null; i++) {
		const questionPrompt = data.get(`question-prompt-${i}`)?.toString()!;
		if (questionPrompt === "") {
			fails.push("Each question must have a prompt.");
		}

		const correctAnswer = data.get(`correct-answer-${i}`)?.toString()!;
		if (correctAnswer === "") {
			fails.push("Each question must have a correct answer.");
		}

		const incorrectAnswers: string[] = [];

		for (let j = 0; data.get(`incorrect-answer-${i}-${j}`) != null; j++) {
			const incorrectAnswer = data.get(`incorrect-answer-${i}-${j}`)?.toString()!;
			if (incorrectAnswer === "") {
				fails.push("Incorrect answers should not be empty.");
			}
			incorrectAnswers.push(data.get(`incorrect-answer-${i}-${j}`)?.toString()!);
		}

		if (fails.length !== 0) return { quizName: null, quizSet: null, fails };

		const question = { prompt: questionPrompt, correctAnswer, incorrectAnswers };
		quizSet.push(question);
	}
	return { quizName, quizSet, fails: null };
}
