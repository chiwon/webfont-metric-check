import { useState, useEffect, useCallback } from 'react';
import { useFontLoader } from '../hooks/useFontLoader';
import ComparisonPreview from '../components/ComparisonPreview';
import ShareSuccessModal from '../components/ShareSuccessModal';

export default function SizeComparisonPage() {
  // State for Font 1
  const [font1Url, setFont1Url] = useState('');
  const [font1Family, setFont1Family] = useState('');
  const [sampleText1, setSampleText1] = useState('My Fox Jumps');
  const [isItalic1, setIsItalic1] = useState(false);
  const [activeFont1, setActiveFont1] = useState(null);

  // State for Font 2
  const [font2Url, setFont2Url] = useState('');
  const [font2Family, setFont2Family] = useState('');
  const [sampleText2, setSampleText2] = useState('Wily Quiz Glib');
  const [isItalic2, setIsItalic2] = useState(false);
  const [activeFont2, setActiveFont2] = useState(null);

  // Shared State
  const [fontSize, setFontSize] = useState(48);
  const [lineHeight, setLineHeight] = useState(1);
  const [showBackground, setShowBackground] = useState(false);
  const [showCenterLine, setShowCenterLine] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { isLoading: isLoading1, error: error1, loadFont: loadFont1 } = useFontLoader();
  const { isLoading: isLoading2, error: error2, loadFont: loadFont2 } = useFontLoader();

  const handleRenderFonts = useCallback(() => {
    if (font1Family && font1Url) {
      loadFont1(font1Family, font1Url)
        .then(() => setActiveFont1({ family: font1Family, isItalic: isItalic1 }))
        .catch(() => {});
    }
    if (font2Family && font2Url) {
      loadFont2(font2Family, font2Url)
        .then(() => setActiveFont2({ family: font2Family, isItalic: isItalic2 }))
        .catch(() => {});
    }
  }, [font1Family, font1Url, isItalic1, loadFont1, font2Family, font2Url, isItalic2, loadFont2]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('font1Url')) {
      setFont1Url(decodeURIComponent(params.get('font1Url') || ''));
      setFont1Family(decodeURIComponent(params.get('font1Family') || ''));
      setSampleText1(decodeURIComponent(params.get('sampleText1') || 'My Fox Jumps'));
      setIsItalic1(params.get('isItalic1') === 'true');
      
      setFont2Url(decodeURIComponent(params.get('font2Url') || ''));
      setFont2Family(decodeURIComponent(params.get('font2Family') || ''));
      setSampleText2(decodeURIComponent(params.get('sampleText2') || 'Wily Quiz Glib'));
      setIsItalic2(params.get('isItalic2') === 'true');

      setFontSize(parseInt(params.get('fontSize') || 48, 10));
      setLineHeight(parseFloat(params.get('lineHeight') || 1));
      setShowBackground(params.get('showBackground') === 'true');
      setShowCenterLine((params.get('showCenterLine') || 'true') === 'true');
    } else {
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad && (font1Family || font2Family)) {
      handleRenderFonts();
      setIsInitialLoad(false);
    }
  }, [font1Family, font2Family, isInitialLoad, handleRenderFonts]);

  const handleItalic1Toggle = (e) => {
    const isChecked = e.target.checked;
    setIsItalic1(isChecked);
    if (activeFont1) setActiveFont1(prev => ({ ...prev, isItalic: isChecked }));
  };

  const handleItalic2Toggle = (e) => {
    const isChecked = e.target.checked;
    setIsItalic2(isChecked);
    if (activeFont2) setActiveFont2(prev => ({ ...prev, isItalic: isChecked }));
  };

  const handleShare = () => {
    const params = new URLSearchParams({
      font1Url, font1Family, sampleText1, isItalic1,
      font2Url, font2Family, sampleText2, isItalic2,
      fontSize, lineHeight, showBackground, showCenterLine
    });
    const shareUrl = `${window.location.origin}/size-comparison?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccess('URL copied. Share this URL with developers or designers.');
    });
  };

  const setSampleFonts = () => {
    setFont1Url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');
    setFont1Family('Inter');
    setSampleText1('My Fox Jumps');
    setIsItalic1(false);

    setFont2Url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
    setFont2Family('Lora');
    setSampleText2('Wily Quiz Glib');
    setIsItalic2(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6 border-gray-200 dark:border-gray-700">
          <fieldset className="border rounded-lg p-4 border-gray-300 dark:border-gray-600"><legend className="text-lg font-semibold text-gray-800 px-2 dark:text-gray-100">Font 1</legend><div className="grid grid-cols-1 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Font URL</label><input type="text" value={font1Url} onChange={(e) => setFont1Url(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Font Family Name</label><input type="text" value={font1Family} onChange={(e) => setFont1Family(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Sample Text 1</label><input type="text" value={sampleText1} onChange={(e) => setSampleText1(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" /></div><div className="flex items-center"><input id="italic1" type="checkbox" checked={isItalic1} onChange={handleItalic1Toggle} className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600" /><label htmlFor="italic1" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Italic</label></div></div></fieldset>
          <fieldset className="border rounded-lg p-4 border-gray-300 dark:border-gray-600"><legend className="text-lg font-semibold text-gray-800 px-2 dark:text-gray-100">Font 2</legend><div className="grid grid-cols-1 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Font URL</label><input type="text" value={font2Url} onChange={(e) => setFont2Url(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Font Family Name</label><input type="text" value={font2Family} onChange={(e) => setFont2Family(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Sample Text 2</label><input type="text" value={sampleText2} onChange={(e) => setSampleText2(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" /></div><div className="flex items-center"><input id="italic2" type="checkbox" checked={isItalic2} onChange={handleItalic2Toggle} className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600" /><label htmlFor="italic2" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Italic</label></div></div></fieldset>
        </div>

        <fieldset className="mt-4 border-b pb-4 border-gray-200 dark:border-gray-700"><legend className="text-lg font-semibold text-gray-800 mb-2 dark:text-gray-100">Shared Display Options</legend><div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Font Size: {fontSize}px</label><input type="range" min="12" max="100" value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Line Height: {lineHeight}</label><input type="range" min="1" max="3" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" /></div><div className="flex items-center"><input id="show-background" type="checkbox" checked={showBackground} onChange={(e) => setShowBackground(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600" /><label htmlFor="show-background" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Show Background</label></div><div className="flex items-center"><input id="show-center-line-comparison" type="checkbox" checked={showCenterLine} onChange={(e) => setShowCenterLine(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600" /><label htmlFor="show-center-line-comparison" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Show Center Line</label></div></div></fieldset>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
          <button onClick={handleRenderFonts} disabled={isLoading1 || isLoading2} className="w-full sm:col-span-2 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400">{isLoading1 || isLoading2 ? 'Loading Fonts...' : 'Render Fonts'}</button>
          <button onClick={setSampleFonts} className="w-full bg-gray-300 text-gray-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Try Samples</button>
          <button onClick={handleShare} disabled={!activeFont1 && !activeFont2} className="w-full bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400">Share</button>
          {copySuccess && <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50"><div className="bg-white p-4 rounded-lg shadow-lg dark:bg-gray-700 dark:text-gray-100">{copySuccess}</div></div>}
        </div>
      </div>

      {(error1 || error2) && <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-300" role="alert"><p>{error1}</p><p>{error2}</p></div>}

      <ComparisonPreview fontSize={fontSize} lineHeight={lineHeight} showBackground={showBackground} showCenterLine={showCenterLine} font1={activeFont1} font2={activeFont2} sampleText1={sampleText1} sampleText2={sampleText2} />
      <ShareSuccessModal message={copySuccess} onClose={() => setCopySuccess('')} />
    </>
  );
}
