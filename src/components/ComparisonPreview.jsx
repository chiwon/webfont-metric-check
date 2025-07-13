export default function ComparisonPreview({ fontSize, lineHeight, showBackground, showCenterLine, font1, font2, sampleText1, sampleText2 }) {
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  const hasContent = (font1 && sampleText1) || (font2 && sampleText2);
  if (!hasContent) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Visual Comparison</h2>
      <div className="grid grid-cols-1 gap-y-6">
        {weights.map(weight => (
          <div key={weight}>
            <p className="text-sm font-bold text-gray-600 mb-1 dark:text-gray-300">Weight: {weight}</p>
            <div 
              className="relative border border-gray-300 bg-white mt-1 dark:bg-black dark:border-gray-700"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
              }}
            >
              <div className="whitespace-nowrap pl-2">
                {/* Font 1 */}
                {font1 && sampleText1 && (
                  <span 
                    style={{ 
                      fontFamily: `'${font1.family}', sans-serif`, 
                      fontWeight: weight, 
                      fontStyle: font1.isItalic ? 'italic' : 'normal' 
                    }}
                    className={showBackground ? 'bg-pink-700/30' : ''}
                  >
                    {sampleText1}
                  </span>
                )}
                
                {/* Spacer */}
                {font1 && sampleText1 && font2 && sampleText2 && <span>&nbsp;</span>}

                {/* Font 2 */}
                {font2 && sampleText2 && (
                  <span 
                    style={{ 
                      fontFamily: `'${font2.family}', serif`, 
                      fontWeight: weight, 
                      fontStyle: font2.isItalic ? 'italic' : 'normal' 
                    }}
                    className={showBackground ? 'bg-lime-700/30' : ''}
                  >
                    {sampleText2}
                  </span>
                )}
              </div>
              {/* Center line */}
              {showCenterLine && <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 opacity-75"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
