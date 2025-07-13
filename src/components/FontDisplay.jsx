export default function FontDisplay({ fontFamily, sampleText, fontSize, displayMode, lineHeight, overflowHidden, showCenterLine, showBackground }) {
  if (!fontFamily) return null;

  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const renderText = (style, isOverlay, backgroundColorClass = '') => {
    const styleProps = { fontStyle: style };
    let className = `whitespace-nowrap ${backgroundColorClass}`;
    if (isOverlay) className += " text-cyan-400 opacity-75";
    return (
      <div className={`absolute inset-0 flex items-center justify-start pl-2 ${overflowHidden ? 'overflow-hidden' : ''}`}>
        <span style={styleProps} className={className}>{sampleText}</span>
      </div>
    );
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">{fontFamily}</h2>
      <div className="grid grid-cols-1 gap-y-6">
        {weights.map(weight => (
          <div key={weight}>
            <p className="text-sm font-bold text-gray-600 mb-1 dark:text-gray-300">Weight: {weight}</p>
            <div className="relative border border-gray-300 bg-white mt-1 dark:bg-black dark:border-gray-700" style={{ fontFamily: `'${fontFamily}', sans-serif`, fontWeight: weight, lineHeight: lineHeight, fontSize: `${fontSize}px` }}>
              <span className="invisible whitespace-nowrap" style={{ fontStyle: 'normal' }}>{sampleText}</span>
              {(displayMode === 'normal' || displayMode === 'comparison') && renderText('normal', false, showBackground ? 'bg-pink-700/30' : '')}
              {(displayMode === 'italic' || displayMode === 'comparison') && renderText('italic', displayMode === 'comparison', showBackground ? 'bg-lime-700/30' : '')}
              {showCenterLine && <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 opacity-75"></div>}
            </div>
            {displayMode === 'comparison' && <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">Black: Normal, Blue: Italic</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
