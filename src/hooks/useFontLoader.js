import { useState, useCallback } from 'react';

export const useFontLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loadFont = useCallback(async (fontFamily, fontUrl) => {
    if (!fontUrl || !fontFamily) {
      return Promise.reject('Font URL and Family Name are required.');
    }

    setIsLoading(true);
    setError('');

    const existingTag = document.getElementById(`dynamic-font-style-${fontFamily}`);
    if (existingTag) existingTag.remove();

    let element;
    if (fontUrl.endsWith('.js')) {
      element = document.createElement('script');
      element.src = fontUrl;
      element.async = true;
    } else {
      element = document.createElement('link');
      element.href = fontUrl;
      element.rel = 'stylesheet';
    }
    element.id = `dynamic-font-style-${fontFamily}`;

    return new Promise((resolve, reject) => {
      element.onload = async () => {
        try {
          await document.fonts.load(`1em '${fontFamily}'`);
          setIsLoading(false);
          resolve();
        } catch (err) {
          setError(`The font '${fontFamily}' could not be loaded.`);
          setIsLoading(false);
          reject(err);
        }
      };
      element.onerror = () => {
        setError('Failed to load the font resource.');
        setIsLoading(false);
        reject(new Error('Resource load error'));
      };
      document.head.appendChild(element);
    });
  }, []);

  return { isLoading, error, loadFont };
};
