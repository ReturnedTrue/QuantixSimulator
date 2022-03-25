import { Players } from "@rbxts/services";

type PlayerReceivingFunction = (player: Player) => unknown;

export function forEveryPlayer(func: PlayerReceivingFunction, leaveFunc?: PlayerReceivingFunction) {
	Players.GetPlayers().forEach(func);
	Players.PlayerAdded.Connect(func);

	if (leaveFunc) Players.PlayerRemoving.Connect(leaveFunc);
}
