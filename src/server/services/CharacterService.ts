import { OnInit, Service } from "@flamework/core";
import Make from "@rbxts/make";
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

const STATUE_CFRAME = new CFrame(0, 16, 0);
const STATUE_INCREASE = 3;
const STATUE_COLOR = new BrickColor("Dirt brown");
const STATUE_VERTEX_COLOR = new Vector3(STATUE_COLOR.Color.R, STATUE_COLOR.Color.G, STATUE_COLOR.Color.B);

const ADDED_LIGHT = Make("PointLight", {
	Brightness: 1,
	Range: 10,
});

@Service()
export class CharacterService implements OnInit {
	async onInit() {
		const quantixDescription = Players.GetHumanoidDescriptionFromUserId(QUANTIX_USERID);
		//const quantixModel = Players.CreateHumanoidModelFromDescription(quantixDescription, Enum.HumanoidRigType.R6);
		//this.createQuantixStatue(await promiseR6(quantixModel));

		forEveryPlayer(player => this.connectPlayer(player, quantixDescription));
	}

	private increaseCFrameByPercentage(cframe: CFrame) {
		return new CFrame(cframe.Position.mul(STATUE_INCREASE)).mul(cframe.Rotation);
	}

	private updateStatuePart(part: BasePart) {
		part.Material = Enum.Material.Slate;
		part.Size = part.Size.mul(STATUE_INCREASE);
	}

	private updateStatueAccessory(accessory: Accessory) {
		const handle = accessory.FindFirstChild("Handle");
		if (!handle) return;

		const weld = handle.FindFirstChildOfClass("Weld");
		const mesh = handle.FindFirstChildOfClass("SpecialMesh");
		if (!(weld && mesh)) return;

		weld.C0 = this.increaseCFrameByPercentage(weld.C0);
		weld.C1 = this.increaseCFrameByPercentage(weld.C1);

		mesh.Scale = mesh.Scale.mul(STATUE_INCREASE);
		mesh.VertexColor = STATUE_VERTEX_COLOR;
	}

	private recolorStatue(model: CharacterRigR6) {
		const bodyColors = model["Body Colors"];

		for (const name of ASSIGN_TO_BODY_PARTS) {
			bodyColors[name] = STATUE_COLOR;
		}
	}

	private createQuantixStatue(model: CharacterRigR6) {
		model.FindFirstChildOfClass("Shirt")?.Destroy();
		model.FindFirstChildOfClass("Pants")?.Destroy();
		model.Head.FindFirstChild("face")?.Destroy();

		for (const motor of model.Torso.GetChildren()) {
			if (motor.IsA("Motor6D")) {
				motor.C0 = this.increaseCFrameByPercentage(motor.C0);
				motor.C1 = this.increaseCFrameByPercentage(motor.C1);
			}
		}

		for (const child of model.GetChildren()) {
			if (child.IsA("BasePart")) {
				this.updateStatuePart(child);
			} else if (child.IsA("Accessory")) {
				this.updateStatueAccessory(child);
			}
		}

		this.recolorStatue(model);

		model.Humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.None;

		model.PivotTo(STATUE_CFRAME);
		model.Parent = Workspace;
	}

	private connectPlayer(player: Player, description: HumanoidDescription) {
		const onCharacterAdded = (character: Model) => {
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;
			const root = character.WaitForChild("HumanoidRootPart");

			if (!character.IsDescendantOf(Workspace)) {
				character.AncestryChanged.Wait();
			}

			humanoid.ApplyDescription(description);
			ADDED_LIGHT.Clone().Parent = root;
		};

		if (player.Character) onCharacterAdded(player.Character);
		player.CharacterAdded.Connect(onCharacterAdded);
	}
}
