'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface ThemeContextProps {
  activeTheme: string;
  setActiveTheme: any;
  inactiveTheme: string;
}

const ThemeContext = createContext({} as ThemeContextProps);

export const useTheme = () => useContext(ThemeContext);

function ThemeContextProvider(props: any): any {
  const [activeTheme, setActiveTheme] = useState('light');
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';
  const didHydrate = useRef(false);

  useEffect(() => {
    if (!didHydrate.current) {
      didHydrate.current = true;
      const savedTheme = window.localStorage.getItem('theme');

      if (
        (savedTheme === 'light' || savedTheme === 'dark') &&
        savedTheme !== activeTheme
      ) {
        setActiveTheme(savedTheme);
        return;
      }
    }

    document.documentElement.dataset.theme = activeTheme;
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  const value = { activeTheme, setActiveTheme, inactiveTheme };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
