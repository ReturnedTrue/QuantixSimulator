import { Controller, OnInit } from "@flamework/core";
import Make from "@rbxts/make";
import Roact from "@rbxts/roact";
import { Players, SoundService, UserInputService } from "@rbxts/services";
import { Functions } from "client/remotes";
import { PointIndicator } from "client/roact/components/stat/PointIndicator";
import { connectedStatsUI } from "client/roact/components/stat/StatsUI";
import { renderConnectedComponent } from "client/roact/util/functions/renderConnectedComponent";
import { RbxAssetString } from "shared/types/util/RbxAssetString";

const POINT_SOUND: RbxAssetString = "rbxassetid://6548494023";
const CRITICAL_POINT_SOUND: RbxAssetString = "rbxassetid://145486970";

const INDICATOR_TTL = 1;
const INDICATOR_DISPLAY_ORDER = 3;

@Controller()
export class PointsController implements OnInit {
	private pointIndicatorUI = Make("ScreenGui", {
		Name: "PointIndicators",
		DisplayOrder: INDICATOR_DISPLAY_ORDER,
		ResetOnSpawn: false,
		Parent: Players.LocalPlayer.WaitForChild("PlayerGui"),
	});

	private pointSoundInstance = Make("Sound", {
		SoundId: POINT_SOUND,
		Volume: 0.5,
		Parent: SoundService,
	});

	private critialSoundInstance = Make("Sound", {
		SoundId: CRITICAL_POINT_SOUND,
		Volume: 0.25,
		Parent: SoundService,
	});

	onInit() {
		UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;

			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				this.validateAndAddPoints();
			}
		});

		renderConnectedComponent(connectedStatsUI, {
			quanpoints: 0,
			glaggles: 0,
		});
	}

	private validateAndAddPoints() {
		Functions.addPoints().then(response => {
			if (response) {
				const element = Roact.createElement(PointIndicator, {
					points: response.pointsAdded,
					critical: response.wasCritical,

					tweenTime: INDICATOR_TTL,
					finishCallback: () => Roact.unmount(tree),
				});

				const tree = Roact.mount(element, this.pointIndicatorUI);

				const sound = response.wasCritical ? this.critialSoundInstance : this.pointSoundInstance;
				SoundService.PlayLocalSound(sound);
			}
		});
	}
}
