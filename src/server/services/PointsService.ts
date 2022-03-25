import { OnInit, Service, Dependency } from "@flamework/core";
import { Functions } from "server/remotes";
import { PlayerDataService } from "./PlayerDataService";

@Service()
export class PointsService implements OnInit {
	private readonly playerDataService = Dependency<PlayerDataService>();

	onInit() {
		Functions.addPoints.setCallback(player => this.processPointsRequest(player));
	}

	private processPointsRequest(player: Player) {
		const dataObject = this.playerDataService.getDataObject(player);
		if (!dataObject) return false;

		dataObject.update("quanpoints", dataObject.data.quanpoints + 1);

		return true;
	}
}
