import React, { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Upload, Sparkles, ImageIcon, FileText } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { createBrand, getBrand, updateBrand } from "@/lib/brand";
import LogoUploader from "./LogoUploader";
import ColorPalette from "./ColorPalette";
import ProductUploader from "./ProductUploader";

export default function BrandForm() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [businessName, setBusinessName] = useState("");
	const [kitMode, setKitMode] = useState<"sample" | "custom">("sample");
	const [brandBrief, setBrandBrief] = useState("");
	const [photographyStyle, setPhotographyStyle] = useState("");
	const [logoFile, setLogoFile] = useState<File | null>(null);
	const [fontPreference, setFontPreference] = useState("Playfair Display");
	const [colorPalette, setColorPalette] = useState("#1E3A2F, #D4A373, #F8F4EC");
	const [designGuidance, setDesignGuidance] = useState("");
	const [productImages, setProductImages] = useState<File[]>([]);
	const [brandBookFile, setBrandBookFile] = useState<File | null>(null);
	const [brandId, setBrandId] = useState<string | null>(null);
	const [logoUrl, setLogoUrl] = useState<string | null>(null);
	const [brandBookUrl, setBrandBookUrl] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const paletteColors = useMemo(() => {
		const parsed = colorPalette
			.split(",")
			.map((color) => color.trim())
			.filter(Boolean);

		return parsed.length ? parsed : ["#1E3A2F", "#D4A373", "#F8F4EC"];
	}, [colorPalette]);

	useEffect(() => {
		if (!user?.id) return;

		const loadBrand = async () => {
			const brand = await getBrand(user.id);
			if (!brand) return;

			setBrandId(brand.id);
			setBusinessName(brand.business_name ?? "");

			const brandKit = brand.brand_kit_data ?? {};
			setKitMode(brandKit.kitMode === "custom" ? "custom" : "sample");
			setBrandBrief(brandKit.brandBrief ?? "");
			setPhotographyStyle(brandKit.photographyStyle ?? "");
			setFontPreference(brandKit.fontPreference ?? "Playfair Display");
			setColorPalette(brandKit.colorPalette ?? "#1E3A2F, #D4A373, #F8F4EC");
			setDesignGuidance(brandKit.designGuidance ?? "");
			setLogoUrl(brandKit.logoUrl ?? null);
			setBrandBookUrl(brandKit.brandBookUrl ?? null);
		};

		void loadBrand();
	}, [user?.id]);

	const fillSampleKit = () => {
		setBusinessName("Vordi Fashion Hub");
		setBrandBrief("Modern, elegant, premium fashion brand with a warm editorial feel and timeless storytelling.");
		setPhotographyStyle("Warm editorial fashion photography with soft natural light.");
		setLogoFile(null);
		setLogoUrl(null);
		setFontPreference("Playfair Display");
		setColorPalette("#1E3A2F, #D4A373, #F8F4EC");
		setDesignGuidance("Keep layouts refined, premium, and minimal with a strong emphasis on storytelling and thoughtful spacing.");
		setProductImages([]);
		setBrandBookFile(null);
		setBrandBookUrl(null);
		setKitMode("sample");
	};

	const uploadFile = async (
		file: File,
		bucket: "logos" | "brand-books" | "Product Images",
		folder: string
	) => {
		if (!user?.id) throw new Error("Unable to upload file without a signed-in user.");

		const fileExt = file.name.split(".").pop() || "bin";
		const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;

		const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
			cacheControl: "3600",
			upsert: true,
		});

		if (error) throw error;

		const { data: publicUrlData, error: publicUrlError } = await (supabase as any).storage
			.from(bucket)
			.getPublicUrl(fileName);

		if (publicUrlError) throw publicUrlError;

		return publicUrlData?.publicUrl ?? null;
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (!user?.id) {
			setError("Please sign in again to continue.");
			return;
		}

		const trimmedName = businessName.trim();
		if (!trimmedName) {
			setError("Please enter your business name.");
			return;
		}

		setIsSaving(true);
		setError("");
		setMessage("");

		try {
			const { data: sessionData } = await supabase.auth.getSession();
			const sessionUserId = sessionData?.session?.user?.id;
			if (!sessionUserId || sessionUserId !== user.id) {
				throw new Error("Your authentication session is not valid. Please sign in again.");
			}

			let logoUrlToSave = logoUrl;
			let brandBookUrlToSave = brandBookUrl;

			if (logoFile) logoUrlToSave = await uploadFile(logoFile, "logos", "logos");
			if (brandBookFile) brandBookUrlToSave = await uploadFile(brandBookFile, "brand-books", "brand-books");

			const brandKitData = {
				kitMode,
				businessName: trimmedName,
				brandBrief: kitMode === "sample" ? "Modern, elegant, premium fashion brand with a warm editorial feel and timeless storytelling." : brandBrief.trim(),
				photographyStyle: kitMode === "sample" ? "Warm editorial fashion photography with soft natural light." : photographyStyle.trim(),
				logoUrl: logoUrlToSave,
				fontPreference: kitMode === "sample" ? "Playfair Display" : fontPreference.trim(),
				colorPalette: kitMode === "sample" ? "#1E3A2F, #D4A373, #F8F4EC" : colorPalette.trim(),
				designGuidance: kitMode === "sample" ? "Keep layouts refined, premium, and minimal with a strong emphasis on storytelling and thoughtful spacing." : designGuidance.trim(),
				productImageCount: productImages.length,
				brandBookUrl: brandBookUrlToSave,
			};

			const brandRow = {
				id: user.id,
				business_name: trimmedName,
				brand_kit_data: brandKitData,
				updated_at: new Date().toISOString(),
			};

			const saveResult = brandId ? await updateBrand(brandId, brandRow) : await createBrand(brandRow);
			setBrandId(saveResult.id);

			setMessage("Brand profile saved successfully.");
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to save your brand profile right now.");
		} finally {
			setIsSaving(false);
		}
	};

	const uploadSummary = useMemo(() => {
		const productCount = productImages.length;
		const brandBookLabel = brandBookFile ? brandBookFile.name : "No brand book uploaded yet";
		return `${productCount} product image${productCount === 1 ? "" : "s"} • ${brandBookLabel}`;
	}, [brandBookFile, productImages.length]);

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
			<div className="mb-6 sm:mb-8">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Brand profile</p>
				<h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Create your brand kit</h1>
				<p className="mt-2 text-sm text-gray-500">Start with a sample kit, create your own, or upload a full brand book to auto-fill your brand system.</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
					<div className="space-y-4 sm:space-y-6">
						<label className="block text-sm font-medium text-gray-700">
							<span className="mb-2 block">Business name</span>
							<input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Vordi Fashion Hub" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white" />
						</label>

						<div>
							<p className="mb-2 text-sm font-medium text-gray-700">Choose a brand kit path</p>
							<div className="grid gap-3 sm:grid-cols-2">
								<button type="button" onClick={fillSampleKit} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${kitMode === "sample" ? "border-brand bg-brand/10 text-brand" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
									<div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4" />Use sample kit</div>
									<p className="mt-1 text-xs text-gray-500">Perfect for testing the experience quickly.</p>
								</button>
								<button type="button" onClick={() => setKitMode("custom")} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${kitMode === "custom" ? "border-brand bg-brand/10 text-brand" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
									<div className="flex items-center gap-2 font-semibold"><ImageIcon className="h-4 w-4" />Create my own</div>
									<p className="mt-1 text-xs text-gray-500">Build your logo, palette, typography and visuals.</p>
								</button>
							</div>
						</div>

						<label className="block text-sm font-medium text-gray-700">
							<span className="mb-2 block">Brand brief for AI</span>
							<textarea value={brandBrief} onChange={(e) => setBrandBrief(e.target.value)} placeholder="Describe your brand voice, audience, values, and desired mood..." className="min-h-28 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white" />
						</label>

						<label className="block text-sm font-medium text-gray-700">
							<span className="mb-2 block">Photography style</span>
							<input type="text" value={photographyStyle} onChange={(e) => setPhotographyStyle(e.target.value)} placeholder="e.g. warm editorial, minimal lifestyle, high contrast" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white" />
						</label>
					</div>

					<div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:space-y-6 sm:p-5">
						<LogoUploader logoFile={logoFile} setLogoFile={setLogoFile} logoUrl={logoUrl} setLogoUrl={setLogoUrl} />

						<label className="block text-sm font-medium text-gray-700">
							<span className="mb-2 block">Fonts / typography</span>
							<select value={fontPreference} onChange={(e) => setFontPreference(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand">
								<option value="Playfair Display">Playfair Display</option>
								<option value="Inter">Inter</option>
								<option value="Montserrat">Montserrat</option>
								<option value="Cormorant Garamond">Cormorant Garamond</option>
								<option value="Space Grotesk">Space Grotesk</option>
							</select>
							<div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">
								<p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Preview</p>
								<p className="text-lg" style={{ fontFamily: fontPreference }}>{"The quick brown fox jumps over the lazy dog."}</p>
							</div>
						</label>

						<ColorPalette colorPalette={colorPalette} setColorPalette={setColorPalette} />

						<label className="block text-sm font-medium text-gray-700">
							<span className="mb-2 block">Design guidance</span>
							<textarea value={designGuidance} onChange={(e) => setDesignGuidance(e.target.value)} placeholder="Share visual direction, layout preferences, and usage notes..." className="min-h-24 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand" />
						</label>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<ProductUploader productImages={productImages} setProductImages={setProductImages} />

					<label className="block rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-700">
						<div className="mb-2 flex items-center gap-2"><FileText className="h-4 w-4 text-brand" />Upload brand book</div>
						<p className="text-xs text-gray-500">PNG, PDF, JPG up to 15MB</p>
						<input type="file" accept="image/png,image/jpeg,application/pdf" className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand" onChange={(e) => setBrandBookFile(e.target.files ? Array.from(e.target.files)[0] : null)} />
					</label>
				</div>

				<div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 text-sm text-gray-700">
					<p className="font-semibold text-gray-900">Upload summary</p>
					<p className="mt-1">{uploadSummary}</p>
				</div>

				{error ? <p className="text-sm text-red-600">{error}</p> : null}
				{message ? <p className="text-sm text-brand">{message}</p> : null}

				<div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
					<button type="submit" disabled={isSaving} className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70">{isSaving ? "Saving..." : "Save brand profile"}</button>

					<button type="button" onClick={() => navigate({ to: "/dashboard" })} className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Cancel</button>
				</div>
			</form>
		</div>
	);
}
