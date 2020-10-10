/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

interface IMyOwnRef {
	// some times we use ref hooks without initial data
	// so in that case we can specify type of data we are gonna store in our "box"
	//usage: myOwnRef<number>()
	<T = undefined>(): { current: T | undefined };
	// or if we have initialData
	// we can infer type from argument
	<T extends any>(initalValue: T): { current: T };
}

export const myOwnRef: IMyOwnRef = (initialValue?: any): any =>
	useState({ current: initialValue })[0];
