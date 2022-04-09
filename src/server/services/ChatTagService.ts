import { OnInit, Service } from "@flamework/core";
import { ChatTag, GetLuaChatService } from "@rbxts/chat-service";
import { Players } from "@rbxts/services";
import { playerIsPremium } from "server/util/functions/playerIsPremium";
import { QUANTIX_USERID, RETURNED_USERID } from "shared/constants";

const SPECIFIC_USER_TAGS = new Map<number, ChatTag>([
	[
		QUANTIX_USERID,
		{
			TagText: "The One",
			TagColor: Color3.fromRGB(69, 5, 150),
		},
	],

	[
		RETURNED_USERID,
		{
			TagText: "The Developer",
			TagColor: Color3.fromRGB(0, 255, 255),
		},
	],

	[
		41764737, // AWhale
		{
			TagText: "Hot 😳",
			TagColor: Color3.fromRGB(242, 120, 242),
		},
	],
]);

const PREMIUM_TAG: ChatTag = {
	TagText: "Premium",
	TagColor: new Color3(1, 1, 1),
};

@Service()
export class ChatTagService implements OnInit {
	private chatService = GetLuaChatService();

	onInit() {
		this.chatService.SpeakerAdded.Connect(speakerName => {
			const player = Players.FindFirstChild(speakerName);

			if (player && player.IsA("Player")) {
				this.addChatTags(player);
			}
		});
	}

	private addChatTags(player: Player) {
		const chatTags = new Array<ChatTag>();

		const userTag = SPECIFIC_USER_TAGS.get(player.UserId);
		if (userTag) {
			chatTags.push(userTag);
		}

		if (playerIsPremium(player)) {
			chatTags.push(PREMIUM_TAG);
		}

		const speaker = this.chatService.GetSpeaker(player.Name);
		speaker?.SetExtraData("Tags", chatTags);
	}
}
