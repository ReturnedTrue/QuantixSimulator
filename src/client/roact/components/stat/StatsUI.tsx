import Roact from "@rbxts/roact";
import { StaticScreenGui } from "client/roact/util/components/StaticScreenGui";
import { TransparentGrid } from "client/roact/util/components/TransparentGrid";
import { connectComponent } from "client/roact/util/functions/connectComponent";
import { CombinedState } from "client/rodux/store";
import { PLAB_IMAGE, QUANTIX_IMAGE } from "shared/constants";
import { MenuButton } from "./components/MenuButton";
import { StatDisplay } from "./components/StatDisplay";

interface StatsUIProps {
	quanpoints: number;
	glaggles: number;
}

export class StatsUI extends Roact.Component<StatsUIProps> {
	public render() {
		return (
			<StaticScreenGui name="Stats" order={1}>
				<StatDisplay
					name="Glaggles"
					displayedAmount={this.props.glaggles}
					imageId={PLAB_IMAGE}
					position={UDim2.fromScale(-0.05, 0.35)}
				/>
				<StatDisplay
					name="Quanpoints"
					displayedAmount={this.props.quanpoints}
					imageId={QUANTIX_IMAGE}
					position={UDim2.fromScale(-0.05, 0.425)}
				/>

				<TransparentGrid
					position={UDim2.fromScale(0.008, 0.5)}
					size={UDim2.fromScale(0.185, 0.35)}
					itemsPerRow={2}
					itemSize={UDim2.fromScale(0.45, 0.45)}
					paddingSize={UDim2.fromScale(0.05, 0.05)}
				>
					<MenuButton name="Shop" imageId={PLAB_IMAGE} />
				</TransparentGrid>
			</StaticScreenGui>
		);
	}
}
// TODO: Add menu button functionality (create Rodux state)
export const connectedStatsUI = connectComponent(StatsUI, (state: CombinedState) => {
	const { quanpoints, glaggles } = state.data;

	return {
		quanpoints,
		glaggles,
	};
});
