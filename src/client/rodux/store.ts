import { Store, combineReducers } from "@rbxts/rodux";
import { DataActions, dataReducer, DataState } from "./states/data";

type CombinedActions = DataActions;

export interface CombinedState {
	data: DataState;
}

const combinedReducer = combineReducers<CombinedState, CombinedActions>({
	data: dataReducer,
});

export const clientStore = new Store(combinedReducer);
