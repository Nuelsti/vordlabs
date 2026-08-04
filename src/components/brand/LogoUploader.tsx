import React from "react";

type Props = {
	logoFile: File | null;
	setLogoFile: (f: File | null) => void;
	logoUrl: string | null;
	setLogoUrl: (u: string | null) => void;
};

export default function LogoUploader({ logoFile, setLogoFile, logoUrl, setLogoUrl }: Props) {
	return (
		<label className="block text-sm font-medium text-gray-700">
			<span className="mb-2 block">Logo image</span>
			<div className="rounded-2xl border border-dashed border-gray-300 bg-white p-4">
				<input type="file" accept="image/png,image/jpeg,image/webp" className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand" onChange={(e) => setLogoFile(e.target.files ? Array.from(e.target.files)[0] : null)} />
				{logoFile ? (
					<div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
						<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
							<img src={URL.createObjectURL(logoFile)} alt="Uploaded logo preview" className="h-full w-full object-cover" />
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold text-gray-900">{logoFile.name}</p>
							<p className="text-xs text-gray-500">PNG, JPG, or JPEG up to 2MB</p>
						</div>
					</div>
				) : logoUrl ? (
					<div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
						<div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
							<img src={logoUrl} alt="Logo" className="h-full w-full object-cover" />
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold text-gray-900">Current logo</p>
							<p className="text-xs text-gray-500">From previously saved brand</p>
						</div>
					</div>
				) : null}
			</div>
		</label>
	);
}
