import "./App.scss";
// @deno-types="@types/react"
import { useState } from "react";

function App() {
	const [length, setLength] = useState(12);

	const [upper, setUpper] = useState(true);
	const [lower, setLower] = useState(true);
	const [num, setNum] = useState(true);
	const [special, setSpecial] = useState(true);

	return (
		<main className={"main"}>
			<button className={"button"}>Test</button>
		</main>
	);
}

export default App;
