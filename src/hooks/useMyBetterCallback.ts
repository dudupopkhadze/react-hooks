import React, { useRef } from "react";

type IFucntionType = (...args: any[]) => any;

export const useMyBetterCallback = <T extends IFucntionType>(fn: T): T => {
	const fnRef = useRef(fn);
	// useRef will only initilize with fn first time
	// we should always have the most recent function
	// without this our callback won't behave as we expect
	fnRef.current = fn;
	return useRef((...args: any) => fnRef.current(...args)).current as T;
};
