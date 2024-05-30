type DataSearchType = {
	id: string;
	name: string;
	quiz_length: number;
	user_id: string;
};

export function generateSearchResults(data: DataSearchType[], searchQuery: string) {
	// escape special regex characters
	const match = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return data.filter((quiz) =>
		quiz.name
			.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
			.toLowerCase()
			.includes(match)
	);
}
