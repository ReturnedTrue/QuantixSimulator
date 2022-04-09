import Roact from "@rbxts/roact";
import { BoatTween, BoatTweenData } from "@rbxts/boat-tween";

interface TweenableBindingOptions {
	type: "Number" | "Int";
	originalValue?: number;
}

type AcceptedValueInstance = NumberValue | IntValue;

export class TweenableBinding<T extends AcceptedValueInstance> {
	public obj: Roact.Binding<number>;

	private updateObj: Roact.BindingFunction<number>;
	private valueInstance: T;

	constructor(options: TweenableBindingOptions) {
		this.valueInstance = new Instance(`${options.type}Value`) as T;
		this.valueInstance.Value = options.originalValue ?? 0;

		[this.obj, this.updateObj] = Roact.createBinding(this.valueInstance.Value);
		this.valueInstance.Changed.Connect(value => {
			this.updateObj(value);
		});
	}

	public tween(tweenOptions: BoatTweenData<T>) {
		const tween = BoatTween.Create(this.valueInstance, tweenOptions);
		tween.Play();

		return tween;
	}

	public destroy() {
		this.valueInstance.Destroy();
	}
}
