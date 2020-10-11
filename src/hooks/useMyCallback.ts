import React, { useMemo } from "react";

type DependencyList = ReadonlyArray<any>;
type IFucntionType = (...args: any[]) => any;

export const useMyCallback = <T extends IFucntionType>(
	fn: T,
	deps?: DependencyList
) => useMemo(fn, deps);
