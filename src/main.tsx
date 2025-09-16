import { StrictMode, createContext, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

type Lang = 'uz';
export const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'uz', setLang: () => {} });

function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uz');
  const setLang = (_l: Lang) => {
    setLangState('uz');
  };
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  useEffect(() => {
    document.documentElement.setAttribute('lang', 'uz');
  }, [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
