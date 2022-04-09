import RoactRodux from "@rbxts/roact-rodux";
import { CombinedState } from "client/rodux/store";
import { AnyConnectedComponent } from "./renderConnectedComponent";

export function connectComponent<P>(
	component: RoactRodux.ComponentType<P>,
	mapStateToProps: (state: CombinedState) => Partial<P>,
) {
	return RoactRodux.connect(mapStateToProps)(component as never) as AnyConnectedComponent<P>;
}
