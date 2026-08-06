import React from "react";

type Props = {
	colorPalette: string;
	setColorPalette: (c: string) => void;
};

export default function ColorPalette({ colorPalette, setColorPalette }: Props) {
	const palette = colorPalette.split(",").map((p) => p.trim()).filter(Boolean);

	return (
		<label className="block text-sm font-medium text-gray-700">
			<span className="mb-2 block">Color palette</span>
			<div className="flex flex-wrap gap-3">
				{palette.map((color, index) => (
					<label key={`${color}-${index}`} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
						<input type="color" value={color} onChange={(e) => {
							const next = [...palette];
							next[index] = e.target.value;
							setColorPalette(next.join(", "));
						}} className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0" />
						<span className="font-medium">{color.toUpperCase()}</span>
					</label>
				))}
			</div>
			<div className="mt-3 flex flex-wrap gap-2">
				{palette.map((color, index) => (
					<div key={`${color}-swatch-${index}`} className="h-10 w-10 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: color }} />
				))}
			</div>
			<input type="text" value={colorPalette} onChange={(e) => setColorPalette(e.target.value)} placeholder="e.g. #1E3A2F, #D4A373, #F8F4EC" className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand" />
		</label>
	);
}
