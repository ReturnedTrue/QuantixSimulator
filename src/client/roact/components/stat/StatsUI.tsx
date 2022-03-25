import Roact from "@rbxts/roact";
import { connectComponent } from "client/roact/util/functions/connectComponent";
import { CombinedState } from "client/rodux/store";

interface StatsUIProps {
	quanpoints: number;
}

export class StatsUI extends Roact.Component<StatsUIProps> {
	public render() {
		return (
			<screengui Key="Stats">
				<textlabel
					Position={UDim2.fromScale(0, 0.45)}
					Size={UDim2.fromScale(0.1, 0.05)}
					Text={`Quanpoints: ${this.props.quanpoints}`}
				/>
			</screengui>
		);
	}
}

export const connectedStatsUI = connectComponent(StatsUI, (state: CombinedState) => {
	return {
		quanpoints: state.data.quanpoints,
	};
});
