import React from "react";

type Props = {
	productImages: File[];
	setProductImages: (files: File[]) => void;
};

export default function ProductUploader({ productImages, setProductImages }: Props) {
	return (
		<label className="block rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-700">
			<div className="mb-2 flex items-center gap-2">Upload product images</div>
			<p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB each</p>
			<input type="file" accept="image/png,image/jpeg,image/webp" multiple className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand" onChange={(e) => setProductImages(e.target.files ? Array.from(e.target.files) : [])} />

			{productImages.length > 0 && (
				<div className="mt-3 grid grid-cols-3 gap-2">
					{productImages.map((f, i) => (
						<div key={i} className="h-20 w-full overflow-hidden rounded-md border border-gray-200 bg-gray-50">
							<img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
						</div>
					))}
				</div>
			)}
		</label>
	);
}
