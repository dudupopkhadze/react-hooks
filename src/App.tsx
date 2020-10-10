import React, { useState, useCallback } from "react";
import { myOwnRef } from "../hooks/useRef";

const App = () => {
	const [counter, setCounter] = useState(0);
	const memoizedIncrementHandler = useCallback(
		() => setCounter(x => x + 1),
		[]
	);

	const incrementHandler = () => setCounter(counter + 1);

	return (
		<div>
			value: {counter}
			<br />
			<br />
			<IncrementButton
				warnOnCallbackChange={true}
				onClick={memoizedIncrementHandler}
				title="+1"
				comment="This should only once"
			/>
			<br />
			<IncrementButton
				warnOnCallbackChange={false}
				onClick={incrementHandler}
				title="+1"
				comment="This should render many times"
			/>
		</div>
	);
};

const IncrementButton: React.FC<{
	onClick: () => void;
	title: string;
	warnOnCallbackChange: boolean;
	comment?: string;
}> = React.memo(({ onClick, title, comment }) => {
	const renderCount = useRenderCount();
	return (
		<div>
			<button onClick={onClick}>{title}</button>
			<span>Render count: {renderCount}</span>
			<div style={{ fontSize: "0.8em" }}>{comment}</div>
		</div>
	);
});

const useRenderCount = () => {
	const renderRef = myOwnRef(0);
	renderRef.current++;
	return renderRef.current;
};

export default App;
