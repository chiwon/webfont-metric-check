export default function FontInputGroup({ title, fontUrl, onFontUrlChange, fontFamily, onFontFamilyChange, fontSize, onFontSizeChange }) {
  return (
    <fieldset className="border rounded-lg p-4">
      <legend className="text-lg font-semibold text-gray-800 px-2">{title}</legend>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor={`${title}-font-url`} className="block text-sm font-medium text-gray-700 mb-1">Font URL</label>
          <input id={`${title}-font-url`} type="text" value={fontUrl} onChange={onFontUrlChange} placeholder="e.g., Google Fonts URL" className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor={`${title}-font-family`} className="block text-sm font-medium text-gray-700 mb-1">Font Family Name</label>
          <input id={`${title}-font-family`} type="text" value={fontFamily} onChange={onFontFamilyChange} placeholder="e.g., Roboto" className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor={`${title}-font-size`} className="block text-sm font-medium text-gray-700 mb-1">Font Size: {fontSize}px</label>
          <input id={`${title}-font-size`} type="range" min="12" max="100" value={fontSize} onChange={onFontSizeChange} className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        </div>
      </div>
    </fieldset>
  );
}
