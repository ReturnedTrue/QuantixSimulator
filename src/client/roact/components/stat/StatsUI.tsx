import Roact from "@rbxts/roact";
import { StaticScreenGui } from "client/roact/util/components/StaticScreenGui";
import { connectComponent } from "client/roact/util/functions/connectComponent";
import { CombinedState } from "client/rodux/store";
import { QUANTIX_IMAGE } from "shared/constants";
import { StatDisplay } from "./components/StatDisplay";

interface StatsUIProps {
	quanpoints: number;
}

export class StatsUI extends Roact.Component<StatsUIProps> {
	public render() {
		return (
			<StaticScreenGui name="Stats" order={1}>
				<StatDisplay displayedAmount={this.props.quanpoints} imageId={QUANTIX_IMAGE} />
			</StaticScreenGui>
		);
	}
}

export const connectedStatsUI = connectComponent(StatsUI, (state: CombinedState) => {
	return {
		quanpoints: state.data.quanpoints,
	};
});
