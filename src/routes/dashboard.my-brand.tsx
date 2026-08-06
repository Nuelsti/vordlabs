import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Upload, Sparkles, ImageIcon, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { BrandService } from "@/services/brand.service";

export const Route = createFileRoute("/dashboard/my-brand")({
  component: MyBrand,
});

function MyBrand() {
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

  const fontPreviewStyle = useMemo(() => {
    const fontMap: Record<string, string> = {
      "Playfair Display": "'Playfair Display', Georgia, serif",
      Inter: "'Inter', Arial, sans-serif",
      Montserrat: "'Montserrat', Arial, sans-serif",
      "Cormorant Garamond": "'Cormorant Garamond', Georgia, serif",
      "Space Grotesk": "'Space Grotesk', Arial, sans-serif",
    };

    return {
      fontFamily: fontMap[fontPreference] ?? fontPreference,
    };
  }, [fontPreference]);

  useEffect(() => {
    if (!user?.id) return;

    const loadUserBrands = async () => {
      try {
        const brands = await BrandService.getUserBrands();
        if (brands.length > 0 && brands[0]) {
          const firstBrand = brands[0];
          setBusinessName(firstBrand.name);
          const details = await BrandService.getBrandDetails(firstBrand.id);
          if (details.guidelines) {
            setFontPreference(details.guidelines.font_primary || "Playfair Display");
            setColorPalette(
              [details.guidelines.primary_color, details.guidelines.secondary_color, details.guidelines.accent_color]
                .filter(Boolean)
                .join(", ")
            );
            setPhotographyStyle(details.guidelines.photography_style || "");
            setDesignGuidance(details.guidelines.design_guidance || "");
          }
          if (details.aiContext) {
            setBrandBrief(details.aiContext.brand_brief || "");
          }
        }
      } catch (err) {
        console.warn("Could not load user brands:", err);
      }
    };

    void loadUserBrands();
  }, [user?.id]);

  const fillSampleKit = () => {
    setBusinessName("Vordi Fashion Hub");
    setBrandBrief("Modern, elegant, premium fashion brand with a warm editorial feel and timeless storytelling.");
    setPhotographyStyle("Warm editorial fashion photography with soft natural light.");
    setLogoFile(null);
    setFontPreference("Playfair Display");
    setColorPalette("#1E3A2F, #D4A373, #F8F4EC");
    setDesignGuidance("Keep layouts refined, premium, and minimal with a strong emphasis on storytelling and thoughtful spacing.");
    setProductImages([]);
    setBrandBookFile(null);
    setKitMode("sample");
  };

  const handleCustomKitSelection = () => {
    setKitMode("custom");
    setError("");
    setMessage("");
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, type: "product" | "brandBook" | "logo") => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const validFiles = files.filter((file) => {
      const maxSize = type === "product" ? 5 * 1024 * 1024 : type === "logo" ? 5 * 1024 * 1024 : 15 * 1024 * 1024;
      return file.size <= maxSize;
    });

    if (validFiles.length !== files.length) {
      setError(`Some files exceed the ${type === "product" ? "5MB" : type === "logo" ? "5MB" : "15MB"} size limit.`);
      return;
    }

    if (type === "product") {
      setProductImages(validFiles);
    } else if (type === "logo") {
      setLogoFile(validFiles[0] ?? null);
    } else {
      setBrandBookFile(validFiles[0] ?? null);
    }
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
      const colors = (kitMode === "sample" ? "#1E3A2F, #D4A373, #F8F4EC" : colorPalette.trim()).split(",");
      const primary_color = colors[0]?.trim() || "#3A943F";
      const secondary_color = colors[1]?.trim() || "#1E3A2F";
      const accent_color = colors[2]?.trim() || "#D4A373";

      const brand = await BrandService.createBrand({
        name: trimmedName,
        logoFile: logoFile,
      });

      await BrandService.updateBrandSystem(
        brand.id,
        {
          primary_color,
          secondary_color,
          accent_color,
          font_primary: kitMode === "sample" ? "Playfair Display" : fontPreference.trim(),
          photography_style: kitMode === "sample" ? "Warm editorial fashion photography with soft natural light." : photographyStyle.trim(),
          design_guidance: kitMode === "sample" ? "Keep layouts refined, premium, and minimal with a strong emphasis on storytelling and thoughtful spacing." : designGuidance.trim(),
        },
        {
          brand_brief: kitMode === "sample" ? "Modern, elegant, premium fashion brand with a warm editorial feel and timeless storytelling." : brandBrief.trim(),
          tone_of_voice: kitMode === "sample" ? "Warm editorial, timeless storytelling" : photographyStyle.trim(),
        }
      );

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
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Brand profile
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Create your brand kit
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Start with a sample kit, create your own, or upload a full brand book to auto-fill your brand system.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4 sm:space-y-6">
              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Business name</span>
                <input
                  type="text"
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  placeholder="e.g. Vordi Fashion Hub"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white"
                />
              </label>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Choose a brand kit path</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      fillSampleKit();
                    }}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${kitMode === "sample" ? "border-brand bg-brand/10 text-brand" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Sparkles className="h-4 w-4" />
                      Use sample kit
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Perfect for testing the experience quickly.</p>
                  </button>
                  <button
                    type="button"
                    onClick={handleCustomKitSelection}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${kitMode === "custom" ? "border-brand bg-brand/10 text-brand" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <ImageIcon className="h-4 w-4" />
                      Create my own
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Build your logo, palette, typography and visuals.</p>
                  </button>
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Brand brief for AI</span>
                <textarea
                  value={brandBrief}
                  onChange={(event) => setBrandBrief(event.target.value)}
                  placeholder="Describe your brand voice, audience, values, and desired mood..."
                  className="min-h-28 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Photography style</span>
                <input
                  type="text"
                  value={photographyStyle}
                  onChange={(event) => setPhotographyStyle(event.target.value)}
                  placeholder="e.g. warm editorial, minimal lifestyle, high contrast"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:bg-white"
                />
              </label>
            </div>

            <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:space-y-6 sm:p-5">
              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Logo image</span>
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-4">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand"
                    onChange={(event) => handleFileUpload(event, "logo")}
                  />
                  {logoFile ? (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <img
                          src={URL.createObjectURL(logoFile)}
                          alt="Uploaded logo preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{logoFile.name}</p>
                        <p className="text-xs text-gray-500">PNG, JPG, or WEBP up to 5MB</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </label>

              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Fonts / typography</span>
                <select
                  value={fontPreference}
                  onChange={(event) => setFontPreference(event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand"
                >
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Inter">Inter</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Cormorant Garamond">Cormorant Garamond</option>
                  <option value="Space Grotesk">Space Grotesk</option>
                </select>
                <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Preview</p>
                  <p className="text-lg" style={fontPreviewStyle}>
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              </label>

              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Color palette</span>
                <div className="flex flex-wrap gap-3">
                  {paletteColors.map((color, index) => (
                    <label key={`${color}-${index}`} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
                      <input
                        type="color"
                        value={color}
                        onChange={(event) => {
                          const nextColors = [...paletteColors];
                          nextColors[index] = event.target.value;
                          setColorPalette(nextColors.join(", "));
                        }}
                        className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0"
                      />
                      <span className="font-medium">{color.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {paletteColors.map((color, index) => (
                    <div
                      key={`${color}-swatch-${index}`}
                      className="h-10 w-10 rounded-full border border-gray-200 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  value={colorPalette}
                  onChange={(event) => setColorPalette(event.target.value)}
                  placeholder="e.g. #1E3A2F, #D4A373, #F8F4EC"
                  className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                <span className="mb-2 block">Design guidance</span>
                <textarea
                  value={designGuidance}
                  onChange={(event) => setDesignGuidance(event.target.value)}
                  placeholder="Share visual direction, layout preferences, and usage notes..."
                  className="min-h-24 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-700">
              <div className="mb-2 flex items-center gap-2">
                <Upload className="h-4 w-4 text-brand" />
                Upload product images
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB each</p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand"
                onChange={(event) => handleFileUpload(event, "product")}
              />
            </label>

            <label className="block rounded-2xl border border-dashed border-gray-300 bg-white p-4 text-sm font-medium text-gray-700">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-brand" />
                Upload brand book
              </div>
              <p className="text-xs text-gray-500">PNG, PDF, JPG up to 15MB</p>
              <input
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand"
                onChange={(event) => handleFileUpload(event, "brandBook")}
              />
            </label>
          </div>

          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Upload summary</p>
            <p className="mt-1">{uploadSummary}</p>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-brand">{message}</p> : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save brand profile"}
            </button>

            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard" })}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
