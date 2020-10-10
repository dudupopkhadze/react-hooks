import React, { useReducer } from "react";

export const useForceRender = () => {
	const [, forceRender] = useReducer(x => x + 1, 0);
	return forceRender;
};
