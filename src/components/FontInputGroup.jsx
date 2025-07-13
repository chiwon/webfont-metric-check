export default function FontInputGroup({ title, fontUrl, onFontUrlChange, fontFamily, onFontFamilyChange, fontSize, onFontSizeChange, isImportUrlInput }) {
  const handleFontUrlChange = (e) => {
    let value = e.target.value;
    // Remove leading/trailing single or double quotes
    if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    } else if (value.startsWith("\"") && value.endsWith("\"")) {
      value = value.slice(1, -1);
    }
    onFontUrlChange(value);
  };

  return (
    <fieldset className="border rounded-lg p-4">
      <legend className="text-lg font-semibold text-gray-800 px-2">{title}</legend>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor={`${title}-font-url`} className="block text-sm font-medium text-gray-700 mb-1">Font URL</label>
          {isImportUrlInput ? (
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 mr-1">@import url(</span>
              <input
                id={`${title}-font-url`}
                type="text"
                value={fontUrl}
                onChange={handleFontUrlChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <span className="text-gray-600 dark:text-gray-400 ml-1">)</span>
            </div>
          ) : (
            <input
              id={`${title}-font-url`}
              type="text"
              value={fontUrl}
              onChange={handleFontUrlChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          )}
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
