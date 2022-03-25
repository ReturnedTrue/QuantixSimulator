import { Controller, OnStart } from "@flamework/core";
import Make from "@rbxts/make";
import { SoundService } from "@rbxts/services";
import { randomizeArray } from "shared/util/functions/randomizeArray";

interface IBackgroundMusic {
	name: string;
	id: `rbxassetid://${string}`;
}

const MUSIC_PLAYLIST: Array<IBackgroundMusic> = [
	{ name: "Slow Jazz", id: "rbxassetid://1844683184" },
	{ name: "Starlight Jazz", id: "rbxassetid://1840744454" },
	{ name: "Night Jazz", id: "rbxassetid://1837054271" },
];

const PLAYLIST_HIGHEST_INDEX = MUSIC_PLAYLIST.size() - 1;

@Controller()
export class BackgroundMusicController implements OnStart {
	private musicNumber = 0;

	private soundInstance = Make("Sound", {
		Name: "BackgroundMusic",
		Looped: false,
		Volume: 0.75,
		Parent: SoundService,
	});

	onStart() {
		randomizeArray(MUSIC_PLAYLIST);

		this.playNextMusic();
		this.soundInstance.Ended.Connect(() => this.playNextMusic());
	}

	private playNextMusic() {
		const isHighestIndex = this.musicNumber === PLAYLIST_HIGHEST_INDEX;
		this.musicNumber = isHighestIndex ? 0 : this.musicNumber + 1;

		const selectedMusic = MUSIC_PLAYLIST[this.musicNumber];
		this.soundInstance.SoundId = selectedMusic.id;

		if (!this.soundInstance.IsLoaded) {
			this.soundInstance.Loaded.Wait();
		}

		this.soundInstance.TimePosition = 0;
		this.soundInstance.Play();
	}
}
