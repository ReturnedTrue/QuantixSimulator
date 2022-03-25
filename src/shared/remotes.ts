import { Networking } from "@flamework/networking";
import { PlayerData } from "./types/data/PlayerData";

interface ServerEvents {}

interface ServerFunctions {
	getData: () => PlayerData | false;
	addPoints: () => boolean;
}

interface ClientEvents {
	dataUpdated: (data: PlayerData) => void;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
