import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useFontLoader } from "../hooks/useFontLoader";
import FontDisplay from "../components/FontDisplay";
import ShareSuccessModal from "../components/ShareSuccessModal";
import FontUrlInput from "../components/FontUrlInput";
export default function AlignmentCheckPage() {
	const location = useLocation();
	const { isLoading, error, loadFont } = useFontLoader();

	const [fontUrl, setFontUrl] = useState("");
	const [fontFamily, setFontFamily] = useState("");
	const [activeFontFamily, setActiveFontFamily] = useState("");
	const [sampleText, setSampleText] = useState("Typo WAG jpqgy");
	const [fontSize, setFontSize] = useState(36);
	const [displayMode, setDisplayMode] = useState("comparison");
	const [lineHeight, setLineHeight] = useState(1);
	const [overflowHidden, setOverflowHidden] = useState(true);
	const [showCenterLine, setShowCenterLine] = useState(true);
	const [showBackground, setShowBackground] = useState(false);
	const [copySuccess, setCopySuccess] = useState(""); // eslint-disable-line no-unused-vars

	const handleRenderFont = useCallback(() => {
		if (!fontFamily || !fontUrl) return;
		loadFont(fontFamily, fontUrl)
			.then(() => setActiveFontFamily(fontFamily))
			.catch(() => setActiveFontFamily(""));
	}, [fontFamily, fontUrl, loadFont]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.has("fontUrl") && params.has("fontFamily")) {
			setFontUrl(decodeURIComponent(params.get("fontUrl")));
			setFontFamily(decodeURIComponent(params.get("fontFamily")));
			setSampleText(
				decodeURIComponent(params.get("sampleText") || "Typo WAG jpqgy")
			);
			setFontSize(parseInt(params.get("fontSize") || 36, 10));
			setDisplayMode(params.get("displayMode") || "comparison");
			setLineHeight(parseFloat(params.get("lineHeight") || 1));
			setOverflowHidden((params.get("overflowHidden") || "true") === "true");
			setShowCenterLine((params.get("showCenterLine") || "true") === "true");
			if (location.pathname === "/") {
				handleRenderFont();
			}
		}
	}, [location.search, location.pathname, handleRenderFont]);

	useEffect(() => {
		if (fontUrl.includes("fonts.googleapis.com/css")) {
			try {
				const url = new URL(fontUrl);
				const family = url.searchParams.get("family");
				if (family) setFontFamily(family.split(":")[0]);
			} catch {
				/* Ignore */
			}
		}
	}, [fontUrl]);

	const handleShare = () => {
		const params = new URLSearchParams({
			fontUrl: encodeURIComponent(fontUrl),
			fontFamily: encodeURIComponent(fontFamily),
			sampleText: encodeURIComponent(sampleText),
			fontSize: fontSize,
			displayMode: displayMode,
			lineHeight: lineHeight,
			overflowHidden: overflowHidden,
			showCenterLine: showCenterLine,
		});
		const shareUrl = `${window.location.origin}${
			window.location.pathname
		}?${params.toString()}`;
		navigator.clipboard.writeText(shareUrl).then(() => {
			setCopySuccess(
				"URL copied. Share this URL with developers or designers."
			);
		});
	};

	const setSample = () => {
		setFontUrl(
			"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
		);
		setFontFamily("Roboto");
		setSampleText("Typo WAG jpqgy");
	};

	return (
		<>
			<div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
				<fieldset className="border-b pb-4 border-gray-200 dark:border-gray-700">
					<legend className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">
						Font Source
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<FontUrlInput
								id="font-url"
								label="Font URL"
								value={fontUrl}
								onChange={setFontUrl}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
								Font Family Name
							</label>
							<input
								type="text"
								value={fontFamily}
								onChange={(e) => setFontFamily(e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
							/>
						</div>
					</div>
				</fieldset>

				<fieldset className="mt-4 border-b pb-4 border-gray-200 dark:border-gray-700">
					<legend className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">
						Display Options
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
								Sample Text
							</label>
							<input
								type="text"
								value={sampleText}
								onChange={(e) => setSampleText(e.target.value)}
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
								Font Size: {fontSize}px
							</label>
							<input
								type="range"
								min="12"
								max="100"
								value={fontSize}
								onChange={(e) => setFontSize(e.target.value)}
								className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
								View Mode
							</label>
							<div className="inline-flex rounded-md shadow-sm">
								<button
									type="button"
									onClick={() => setDisplayMode("comparison")}
									className={`px-4 py-2 text-sm font-medium transition-colors rounded-l-lg border border-gray-300 ${
										displayMode === "comparison"
											? "bg-blue-600 text-white"
											: "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
									}`}
								>
									Comparison
								</button>
								<button
									type="button"
									onClick={() => setDisplayMode("normal")}
									className={`px-4 py-2 text-sm font-medium transition-colors border-t border-b border-gray-300 ${
										displayMode === "normal"
											? "bg-blue-600 text-white"
											: "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
									}`}
								>
									Normal
								</button>
								<button
									type="button"
									onClick={() => setDisplayMode("italic")}
									className={`px-4 py-2 text-sm font-medium transition-colors rounded-r-md border border-gray-300 ${
										displayMode === "italic"
											? "bg-blue-600 text-white"
											: "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
									}`}
								>
									Italic
								</button>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
								Line Height: {lineHeight}
							</label>
							<input
								type="range"
								min="1"
								max="3"
								step="0.01"
								value={lineHeight}
								onChange={(e) => setLineHeight(e.target.value)}
								className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
							/>
						</div>
						<div className="flex items-center">
							<input
								id="overflow-hidden"
								type="checkbox"
								checked={overflowHidden}
								onChange={(e) => setOverflowHidden(e.target.checked)}
								className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
							/>
							<label
								htmlFor="overflow-hidden"
								className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
							>
								Clip Overflow
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="show-center-line"
								type="checkbox"
								checked={showCenterLine}
								onChange={(e) => setShowCenterLine(e.target.checked)}
								className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
							/>
							<label
								htmlFor="show-center-line"
								className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
							>
								Show Center Line
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="show-background"
								type="checkbox"
								checked={showBackground}
								onChange={(e) => setShowBackground(e.target.checked)}
								className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
							/>
							<label
								htmlFor="show-background"
								className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
							>
								Show Background
							</label>
						</div>
					</div>
				</fieldset>

				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
					<button
						onClick={handleRenderFont}
						disabled={!fontUrl || !fontFamily || isLoading}
						className="w-full sm:col-span-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{isLoading ? "Loading Font..." : "Render Font"}
					</button>
					<button
						onClick={setSample}
						className="w-full bg-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
					>
						Try Sample
					</button>
					<button
						onClick={handleShare}
						disabled={!activeFontFamily}
						className="w-full bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400"
					>
						Share
					</button>
				</div>
			</div>

			{error && (
				<div
					className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-300"
					role="alert"
				>
					<p>{error}</p>
				</div>
			)}

			<FontDisplay
				fontFamily={activeFontFamily}
				sampleText={sampleText}
				fontSize={fontSize}
				displayMode={displayMode}
				lineHeight={lineHeight}
				overflowHidden={overflowHidden}
				showCenterLine={showCenterLine}
				showBackground={showBackground}
			/>
			<ShareSuccessModal
				message={copySuccess}
				onClose={() => setCopySuccess("")}
			/>
		</>
	);
}
