import React, { useRef } from "react";
import { useForceRender } from "./useForceRender";

type ISetState<T> = ((newValue: T) => void) | ((prevValue: T) => T);
type IUseStateArg<T> = T | (() => T);

export const useMyState = <T extends any>(
	defaultValue: IUseStateArg<T>
): [T, ISetState<T>] => {
	const forceRender = useForceRender();

	// useState's behavior is different on first render
	const isFirstCallRef = useRef(true);

	// get starting value
	const startingValue = isFirstCallRef.current
		? typeof defaultValue !== "function"
			? defaultValue
			: (defaultValue as any)()
		: undefined;

	// we initlized our starting value, no more reinitialization needed
	isFirstCallRef.current = false;
	// main ref to our stateful object
	const value = useRef<T>(startingValue);

	const useState = useRef<ISetState<T>>(
		(newState: T | ((curState: T) => T)) => {
			//capture old state, we will need this for compression later
			const prevState = value.current;
			if (typeof newState !== "function") {
				// assign newState to state directly
				value.current = newState;
			} else {
				// assign to state value returned after calling given function
				value.current = (newState as any)(prevState);
			}
			if (prevState !== value.current) {
				forceRender();
			}
		}
	);

	return [value.current, useState.current];
};
