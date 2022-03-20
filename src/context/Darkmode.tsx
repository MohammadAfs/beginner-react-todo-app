import { createContext, Dispatch, FC, useEffect, useState } from 'react';

type StateType = boolean;
interface ContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<React.SetStateAction<boolean>>;
}

const initialState = true;
export const DarkModeContext = createContext<ContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

const DarkModeProvider: FC = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  useEffect(() => {
    let theme = localStorage.getItem('darkmode');
    if (!theme) {
      localStorage.setItem('darkmode', 't');
    }
    theme = localStorage.getItem('darkmode');
    setState(theme === 't');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkmode', state ? 't' : 'f');
    const htmlElement = document.querySelector('html')!;
    if (state) {
      htmlElement.className = 'dark';
    } else {
      htmlElement.className = '';
    }
  }, [state]);

  return (
    <DarkModeContext.Provider
      value={{ darkMode: state, setDarkMode: setState }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
