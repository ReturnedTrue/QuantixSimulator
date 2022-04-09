export class PlayerDebounces {
	private playerTimes = new Map<Player, number>();

	constructor(private timeInterval: number) {}

	public debounceIsFinished(player: Player) {
		const retrievedTime = this.playerTimes.get(player);
		if (retrievedTime === undefined) return true;

		return os.clock() > retrievedTime + this.timeInterval;
	}

	public assignDebounce(player: Player) {
		this.playerTimes.set(player, os.clock());
	}
}
