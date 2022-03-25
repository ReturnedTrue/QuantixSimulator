import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import Rodux from "@rbxts/rodux";
import { CombinedState } from "client/rodux/store";

export function connectComponent<P>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: RoactRodux.ComponentType<any>,
	mapStateToProps: (state: CombinedState) => Partial<P>,
) {
	return RoactRodux.connect(mapStateToProps)(component);
}
