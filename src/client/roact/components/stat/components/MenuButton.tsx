import Roact from "@rbxts/roact";
import { RbxAssetString } from "shared/types/util/RbxAssetString";

interface MenuButtonProps {
	name: string;
	imageId: RbxAssetString;
}

export class MenuButton extends Roact.Component<MenuButtonProps> {
	public render() {
		return (
			<textbutton
				Key={this.props.name}
				Active={false}
				AutoButtonColor={false}
				BackgroundColor3={Color3.fromRGB(255, 255, 255)}
				Size={new UDim2(0.1, 0, 0.15, 0)}
				Text={""}
				TextSize={1}
				TextTransparency={1}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image={this.props.imageId}
					Position={new UDim2(0.1, 0, 0.05, 0)}
					ScaleType={Enum.ScaleType.Fit}
					Size={new UDim2(0.8, 0, 0.775, 0)}
				>
					<uicorner />
				</imagelabel>
				<textlabel
					BackgroundTransparency={1}
					Position={new UDim2(0, 0, 0.8250000000000001, 0)}
					Size={new UDim2(1, 0, 0.15, 0)}
					Text={this.props.name}
					TextScaled={true}
					TextWrapped={true}
				/>
				<uicorner CornerRadius={new UDim(0, 5)} />
			</textbutton>
		);
	}
}
