import { OnInit, Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { PlayerData } from "shared/types/data/PlayerData";
import { DEFAULT_DATA } from "shared/constants";
import { Profile } from "@rbxts/profileservice/globals";
import { forEveryPlayer } from "server/util/functions/forEveryPlayer";
import { Events, Functions } from "server/remotes";

type PlayerDataProperty = keyof PlayerData;

type UpdaterFunction = <T extends PlayerDataProperty>(property: T, value: PlayerData[T]) => void;
type BulkUpdaterFunction = (record: Partial<PlayerData>) => void;

const DATASTORE_NAME = "PlayerData";
const KEY_TEMPLATE = "%d_Data";

@Service()
export class PlayerDataService implements OnInit {
	private profileStore = ProfileService.GetProfileStore(DATASTORE_NAME, DEFAULT_DATA);
	private profiles = new Map<Player, Profile<PlayerData>>();

	onInit() {
		forEveryPlayer(
			player => this.createProfile(player),
			player => this.removeProfile(player),
		);

		Functions.getData.setCallback(player => {
			const profile = this.profiles.get(player);

			return profile?.Data ?? false;
		});
	}

	private createProfile(player: Player) {
		const userId = player.UserId;
		const profileKey = KEY_TEMPLATE.format(userId);
		const profile = this.profileStore.LoadProfileAsync(profileKey);

		if (!profile) {
			return player.Kick();
		}

		profile.ListenToRelease(() => {
			this.profiles.delete(player);
			player.Kick();
		});

		profile.AddUserId(userId);
		profile.Reconcile();

		this.profiles.set(player, profile);
		Events.dataUpdated.fire(player, profile.Data);
	}

	private removeProfile(player: Player) {
		const profile = this.profiles.get(player);
		profile?.Release();
	}

	public getDataObject(player: Player) {
		const profile = this.profiles.get(player);

		if (profile) {
			const update: UpdaterFunction = (property, value) => {
				profile.Data[property] = value;
				Events.dataUpdated.fire(player, profile.Data);
			};

			const bulkUpdate: BulkUpdaterFunction = record => {
				for (const [property, value] of pairs(record)) {
					profile.Data[property] = value;
				}

				Events.dataUpdated.fire(player, profile.Data);
			};

			return {
				data: profile.Data,
				update,
				bulkUpdate,
			};
		}

		return false;
	}
}
