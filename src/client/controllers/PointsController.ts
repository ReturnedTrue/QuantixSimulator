import { Controller, OnInit } from "@flamework/core";
import Make from "@rbxts/make";
import { SoundService, UserInputService } from "@rbxts/services";
import { Functions } from "client/remotes";
import { connectedStatsUI } from "client/roact/components/stat/StatsUI";
import { renderConnectedComponent } from "client/roact/util/functions/renderConnectedComponent";

const POINT_SOUND = "rbxassetid://6548494023";

@Controller()
export class PointsController implements OnInit {
	private pointSoundInstance = Make("Sound", {
		SoundId: POINT_SOUND,
		Volume: 0.5,
		Parent: SoundService,
	});

	onInit() {
		UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;

			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				this.validateAndAddPoints();
			}
		});

		renderConnectedComponent(connectedStatsUI);
	}

	private validateAndAddPoints() {
		Functions.addPoints().then(didAdd => {
			if (didAdd) {
				SoundService.PlayLocalSound(this.pointSoundInstance);
			}
		});
	}
}
