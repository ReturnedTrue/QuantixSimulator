import Roact from "@rbxts/roact";
import { TweenableBinding } from "client/roact/util/classes/TweenableBinding";

interface PointIndicatorProps {
	tweenTime: number;
	finishCallback: () => void;

	points: number;
	critical: boolean;
}

const TEXT_COLOR = new Color3(1, 1, 1);
const CRIT_TEXT_COLOR = Color3.fromRGB(240, 224, 0);

export class PointIndicator extends Roact.Component<PointIndicatorProps> {
	private xPosition = math.random(2.5, 90) / 100;
	private yPosition = new TweenableBinding({ type: "Number", originalValue: math.random(80, 90) / 100 });

	public render() {
		return (
			<frame
				BackgroundTransparency={1}
				Size={new UDim2(0.075, 0, 0.15, 0)}
				Position={this.yPosition.obj.map(value => UDim2.fromScale(this.xPosition, value))}
			>
				<imagelabel
					Key="Indicator"
					BackgroundTransparency={1}
					Image="rbxassetid://9323322422"
					ScaleType={Enum.ScaleType.Fit}
					Size={new UDim2(1, 0, 0.65, 0)}
				>
					<uicorner CornerRadius={new UDim(0, 3)} />
				</imagelabel>
				<textlabel
					BackgroundTransparency={1}
					Font={Enum.Font.SourceSans}
					Position={new UDim2(0, 0, 0.65, 0)}
					Size={new UDim2(1, 0, 0.35, 0)}
					Text={`+${this.props.points}`}
					TextColor3={this.props.critical ? CRIT_TEXT_COLOR : TEXT_COLOR}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
				/>
			</frame>
		);
	}

	protected didMount() {
		const tween = this.yPosition.tween({
			Time: this.props.tweenTime,
			Goal: {
				Value: -0.4,
			},
		});

		tween.Play();
		tween.Completed.Connect(() => this.props.finishCallback());
	}

	protected willUnmount() {
		this.yPosition.destroy();
	}
}
