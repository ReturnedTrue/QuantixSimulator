import { OnInit, Service } from "@flamework/core";
import { CharacterRigR6, promiseR6 } from "@rbxts/promise-character";
import { Players, Workspace } from "@rbxts/services";
import { forEveryPlayer } from "server/util/functions/forEveryPlayer";
import { QUANTIX_USERID } from "shared/constants";

type AssignableBodyColors = keyof ExtractMembers<BodyColors, BrickColor>;

const ASSIGN_TO_BODY_PARTS: Array<AssignableBodyColors> = [
	"HeadColor",
	"LeftArmColor",
	"LeftLegColor",
	"RightArmColor",
	"RightLegColor",
	"TorsoColor",
];

const STATUE_CFRAME = new CFrame(0, 22.5, 0);
const STATUE_COLOR = new BrickColor("Dirt brown");
const STATUE_INCREASE = 5;

@Service()
export class CharacterService implements OnInit {
	async onInit() {
		const quantixDescription = Players.GetHumanoidDescriptionFromUserId(QUANTIX_USERID);
		const quantixModel = Players.CreateHumanoidModelFromDescription(quantixDescription, Enum.HumanoidRigType.R6);
		this.createQuantixStatue(await promiseR6(quantixModel));

		forEveryPlayer(player => this.connectPlayer(player, quantixDescription));
	}

	private createQuantixStatue(model: CharacterRigR6) {
		model.FindFirstChildOfClass("Shirt")?.Destroy();
		model.FindFirstChildOfClass("Pants")?.Destroy();
		model.Head.FindFirstChild("face")?.Destroy();

		const increaseCFrameByPercentage = (cframe: CFrame) => {
			return new CFrame(cframe.Position.mul(STATUE_INCREASE)).mul(cframe.Rotation);
		};

		const color3Color = STATUE_COLOR.Color;
		const vertexColor = new Vector3(color3Color.R, color3Color.G, color3Color.B);

		for (const motor of model.Torso.GetChildren()) {
			if (motor.IsA("Motor6D")) {
				motor.C0 = increaseCFrameByPercentage(motor.C0);
				motor.C1 = increaseCFrameByPercentage(motor.C1);
			}
		}

		for (const child of model.GetChildren()) {
			if (child.IsA("BasePart")) {
				child.Material = Enum.Material.Slate;
				child.Size = child.Size.mul(STATUE_INCREASE);
				//
			} else if (child.IsA("Accessory")) {
				const handle = child.FindFirstChild("Handle");
				if (!handle) continue;

				const accessoryWeld = handle.FindFirstChildOfClass("Weld");
				const accessoryMesh = handle.FindFirstChildOfClass("SpecialMesh");
				if (!(accessoryWeld && accessoryMesh)) continue;

				accessoryWeld.C0 = increaseCFrameByPercentage(accessoryWeld.C0);
				accessoryWeld.C1 = increaseCFrameByPercentage(accessoryWeld.C1);

				accessoryMesh.Scale = accessoryMesh.Scale.mul(STATUE_INCREASE);
				accessoryMesh.VertexColor = vertexColor;
			}
		}

		const bodyColors = model["Body Colors"];

		for (const name of ASSIGN_TO_BODY_PARTS) {
			bodyColors[name] = STATUE_COLOR;
		}

		model.HumanoidRootPart.Anchored = true;
		model.Humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None;

		model.PivotTo(STATUE_CFRAME);
		model.Parent = Workspace;
	}

	private connectPlayer(player: Player, description: HumanoidDescription) {
		player.CharacterAdded.Connect(character => {
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;

			if (!character.IsDescendantOf(Workspace)) {
				character.AncestryChanged.Wait();
			}

			humanoid.ApplyDescription(description);
		});
	}
}
