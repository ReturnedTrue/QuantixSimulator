export function randomizeArray(array: Array<defined>) {
	for (let i = array.size() - 1; i > 0; i--) {
		const j = math.floor(math.random() * (i + 1));

		[array[i], array[j]] = [array[j], array[i]];
	}
}
