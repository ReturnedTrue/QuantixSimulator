import Roact from "@rbxts/roact";
import { RbxAssetString } from "shared/types/util/RbxAssetString";

interface StatDisplayProps {
	displayedAmount: number;
	imageId: RbxAssetString;
}

export class StatDisplay extends Roact.Component<StatDisplayProps> {
	public render() {
		return (
			<frame
				Key="Stat"
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				Position={new UDim2(-0.05, 0, 0.35, 0)}
				Size={new UDim2(0.25, 0, 0.05, 0)}
			>
				<uicorner />
				<frame
					Key="InnerContent"
					BackgroundTransparency={1}
					Position={new UDim2(0.2, 0, 0, 0)}
					Size={new UDim2(0.8, 0, 1, 0)}
				>
					<textlabel
						BackgroundTransparency={1}
						Font={Enum.Font.SourceSans}
						Size={new UDim2(0.8, 0, 1, 0)}
						Text={tostring(this.props.displayedAmount)}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
					/>
					<imagelabel
						BackgroundTransparency={1}
						Image={this.props.imageId}
						Position={new UDim2(0.8, 0, 0.05, 0)}
						ScaleType={Enum.ScaleType.Fit}
						Size={new UDim2(0.2, 0, 0.9, 0)}
					>
						<uicorner CornerRadius={new UDim(0, 5)} />
					</imagelabel>
				</frame>
			</frame>
		);
	}
}
