import Roact from "@rbxts/roact";

interface StaticScreenGuiProps {
	name: string;
	order: number;
}

export class StaticScreenGui extends Roact.Component<StaticScreenGuiProps> {
	public render() {
		return (
			<screengui Key={this.props.name} DisplayOrder={this.props.order} ResetOnSpawn={false}>
				{this.props[Roact.Children]}
			</screengui>
		);
	}
}
