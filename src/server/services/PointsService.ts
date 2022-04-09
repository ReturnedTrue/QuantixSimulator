import { OnInit, Service, Dependency } from "@flamework/core";
import { Functions } from "server/remotes";
import { PlayerDebounces } from "server/util/classes/PlayerDebounces";
import { PlayerDataService } from "./PlayerDataService";

export interface PointsRequestResponse {
	pointsAdded: number;
	wasCritical: boolean;
}

const CRITICAL_CHANCE = 5; // 5%
const CRITIAL_MULTIPLIER = 5;

@Service()
export class PointsService implements OnInit {
	private readonly playerDataService = Dependency<PlayerDataService>();

	private pointsDebounces = new PlayerDebounces(0.05);

	onInit() {
		Functions.addPoints.setCallback(player => this.processPointsRequest(player));
	}

	private processPointsRequest(player: Player): PointsRequestResponse | false {
		if (!this.pointsDebounces.debounceIsFinished(player)) return false;

		const dataObject = this.playerDataService.getDataObject(player);
		if (!dataObject) return false;

		const wasCritical = math.random(0, 100) < CRITICAL_CHANCE;
		const pointsAdded = 1 * (wasCritical ? CRITIAL_MULTIPLIER : 1);

		dataObject.update("quanpoints", dataObject.data.quanpoints + pointsAdded);
		this.pointsDebounces.assignDebounce(player);

		return {
			pointsAdded,
			wasCritical,
		};
	}
}
