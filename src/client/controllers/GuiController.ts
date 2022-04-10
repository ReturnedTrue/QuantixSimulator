import { Controller, OnInit } from "@flamework/core";
import { StarterGui } from "@rbxts/services";

@Controller()
export class GuiContoller implements OnInit {
	onInit() {
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.EmotesMenu, false);
	}
}
