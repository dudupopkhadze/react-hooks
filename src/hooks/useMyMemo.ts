import React, { useRef } from "react";
import deepEqual from "deep-equal";

const areDeepEqual = (prev?: DependencyList, cur?: DependencyList) => {
	if (!cur || !prev || prev.length !== cur.length) return false;
	for (let i = 0; i < prev.length; i++) {
		const p = prev[i];
		const c = cur[i];
		if (p !== c && !deepEqual(p, c)) {
			return false;
		}
	}
	return true;
};

type DependencyList = ReadonlyArray<any>;

export const useMyMemo = <T>(fn: () => T, deps?: DependencyList): T => {
	const prevDependecies = useRef<DependencyList>();
	const currentValue = useRef<T>();
	if (!currentValue.current || !areDeepEqual(deps, prevDependecies.current)) {
		currentValue.current = fn();
		prevDependecies.current = deps;
	}
	return currentValue.current as T;
};
