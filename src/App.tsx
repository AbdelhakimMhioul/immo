import { Configuration, OpenAIApi } from 'openai';
import { useRef, useState } from 'react';

export default function App() {
	const [prompt, setPrompt] = useState('');
	const [img, setImg] = useState('');
	const buttonRef = useRef<HTMLButtonElement>(null);

	const config = new Configuration({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(config);

	const generate_img = async () => {
		if (!prompt) return;
		buttonRef.current?.setAttribute('disabled', 'true');
		buttonRef.current?.classList.add('cursor-not-allowed');
		buttonRef.current?.classList.add('opacity-50');

		const response = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
		});
		console.log(response.data.data[0].url);
		setImg(response.data.data[0].url ?? '');

		buttonRef.current?.removeAttribute('disabled');
		buttonRef.current?.classList.remove('cursor-not-allowed');
		buttonRef.current?.classList.remove('opacity-50');
	};

	return (
		<div className="flex flex-col justify-center items-center pt-32 space-y-6">
			<h1 className="text-4xl font-bold text-rose-600">
				Immo : OpenAI Image Generator
			</h1>
			<div className="flex flex-col space-y-6">
				<input
					className="border-2 border-gray-300 rounded-md focus:outline-none text-lg px-4 py-2 focus:border-rose-600"
					value={prompt}
					placeholder="Type your prompt here..."
					onChange={e => setPrompt(e.target.value)}
				/>
				<button
					onClick={generate_img}
					className="bg-rose-600 py-4 px-2 rounded-md text-white font-bold focus:outline-none"
					ref={buttonRef}
				>
					Generate
				</button>
			</div>
			{img && (
				<div className="flex flex-col">
					<img src={img} className="w-[500px] h-[500px]" />
				</div>
			)}
		</div>
	);
}
