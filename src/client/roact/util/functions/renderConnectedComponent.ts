import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { Players } from "@rbxts/services";
import { clientStore } from "client/rodux/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyConnectedComponent = RoactRodux.ConnectedComponentClass<RoactRodux.ComponentType, any>;

export function renderConnectedComponent(component: AnyConnectedComponent) {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	const roactComponent = Roact.createElement(RoactRodux.StoreProvider, { store: clientStore }, [
		Roact.createElement(component),
	]);

	Roact.mount(roactComponent, playerGui);
}
