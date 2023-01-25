import { Configuration } from 'openai';

export default function App() {
	const config = new Configuration({
		apiKey: import.meta.env.OPENAI_API_KEY,
	});

	return (
		<div className="">
			<div>Test</div>
		</div>
	);
}
