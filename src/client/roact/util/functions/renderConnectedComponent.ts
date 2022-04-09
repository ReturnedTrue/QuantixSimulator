import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { Players } from "@rbxts/services";
import { clientStore } from "client/rodux/store";

export type AnyConnectedComponent<P> = RoactRodux.ConnectedComponentClass<RoactRodux.ComponentType<P>, P>;

export function renderConnectedComponent<P>(component: AnyConnectedComponent<P>, props?: P) {
	const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
	const roactComponent = Roact.createElement(RoactRodux.StoreProvider, { store: clientStore }, [
		Roact.createElement(component, props),
	]);

	Roact.mount(roactComponent, playerGui);
}
