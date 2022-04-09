import { Networking } from "@flamework/networking";
import type { PointsRequestResponse } from "server/services/PointsService";
import { PlayerData } from "./types/data/PlayerData";

interface ServerEvents {}

interface ServerFunctions {
	getData: () => PlayerData | false;
	addPoints: () => PointsRequestResponse | false;
}

interface ClientEvents {
	dataUpdated: (data: PlayerData) => void;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
