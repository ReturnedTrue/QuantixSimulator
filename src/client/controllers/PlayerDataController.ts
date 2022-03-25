import { Controller, OnInit, OnStart } from "@flamework/core";
import { Events, Functions } from "client/remotes";
import { clientStore } from "client/rodux/store";
import { PlayerData } from "shared/types/data/PlayerData";

@Controller()
export class PlayerDataController implements OnInit, OnStart {
	onInit() {
		Events.dataUpdated.connect(data => this.updateStoredData(data));
	}

	async onStart() {
		const data = await Functions.getData.invoke();

		if (data) {
			this.updateStoredData(data);
		}
	}

	private updateStoredData(newData: PlayerData) {
		clientStore.dispatch({ type: "updatePlayerData", newData });
	}
}
