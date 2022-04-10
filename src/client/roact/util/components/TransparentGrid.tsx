import Roact from "@rbxts/roact";

interface TransparentGridProps {
	name?: string;
	position: UDim2;
	size: UDim2;

	itemsPerRow: number;
	itemSize: UDim2;
	paddingSize: UDim2;
}

export class TransparentGrid extends Roact.Component<TransparentGridProps> {
	public render() {
		return (
			<frame
				Key={this.props.name ?? "Grid"}
				BackgroundTransparency={1}
				Position={this.props.position}
				Size={this.props.size}
			>
				<uigridlayout
					FillDirectionMaxCells={this.props.itemsPerRow}
					CellSize={this.props.itemSize}
					CellPadding={this.props.paddingSize}
				/>
				{this.props[Roact.Children]}
			</frame>
		);
	}
}
