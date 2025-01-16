import "./App.scss";
// @deno-types="@types/react"
import React, { useState } from "react";
import { GenPass } from "./interfaces/genpass.ts";

function InputArea({
	setLength,
	password,
	setPassword
} : {
	password: string;
	setLength: React.Dispatch<React.SetStateAction<number>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
	return <input
		type="text"
		minLength={1}
		maxLength={50}
		value={password}
		className="form-control"
		placeholder="Generated password area"
		onChange={ev => {
			ev.preventDefault();
			setPassword(ev.target.value);
			setLength(ev.target.value.length);
		}}
	/>
}

function LengthRange({ length, setLength }: { length: number; setLength: React.Dispatch<React.SetStateAction<number>> }) {
	return (
		<div>
			<div className="form-label">
				Password Length: <input
					type="number"
					min={1}
					max={50}
					value={length}
					onChange={ev => {
						ev.preventDefault();
						if (ev.target.valueAsNumber <= 0)
							ev.target.valueAsNumber = 1;

						setLength(ev.target.valueAsNumber);
					}}
				/>
			</div>
			<input
				id="length"
				type="range"
				min={1}
				max={50}
				step={1}
				value={length}
				className="form-range"
				onChange={ev => {
					ev.preventDefault();
					setLength(ev.target.valueAsNumber);
				}}
			/>
		</div>
	);
}

function CheckBox({
	name,
	checked,
	setChecked
} : {
	name: string;
	checked: boolean;
	setChecked: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<div className="form-check">
			<input className="form-check-input" defaultChecked={checked} type="checkbox" onChange={ev => {
				setChecked(ev.target.checked);
			}}/>
			<label className="form-check-label">
				{name}
			</label>
		</div>
	);
}

function App() {
	const [length, setLength] = useState(12);
	const [password, setPassword] = useState("");

	const [upper, setUpper] = useState(true);
	const [lower, setLower] = useState(true);
	const [num, setNum] = useState(true);
	const [symbol, setSymbol] = useState(true);

	const generate = async () => {
		const body = JSON.stringify({
			"uppercase": upper,
			"lowercase": lower,
			"number": num,
			"special": symbol
		});

		const resp = await fetch(`https://projecttl.net/api/genpass?length=${length}`, {
			method: "POST",
			mode: "cors",
			body: body,
			headers: {
				"Content-Type": "application/json"
			}
		});

		const data: GenPass = await resp.json();
		setPassword(data.content);
	}

	return (
		<main className={"main"}>
			<form onSubmit={ev => {
				ev.preventDefault();
				if (password.length === 0)
					setLength(1);

				generate();
			}}>
				<div>
					<InputArea password={password} setLength={setLength} setPassword={setPassword} />
					<LengthRange length={length} setLength={setLength} />

					<div>
						<CheckBox name="Uppercase" checked={upper} setChecked={setUpper} />
						<CheckBox name="Lowercase" checked={lower} setChecked={setLower} />
						<CheckBox name="Number" checked={num} setChecked={setNum} />
						<CheckBox name="Symbol" checked={symbol} setChecked={setSymbol} />
					</div>
				</div>

				<div className="btn-group" role="group">
					<button type="submit" className={"btn btn-primary"}>
						<span>Generate</span>
					</button>
					<button type="button" className={"btn btn-success"}>
						<i className="bi bi-copy" />
					</button>
				</div>
			</form>
		</main>
	);
}

export default App;
