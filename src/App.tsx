import { useContext } from 'react';
import Todo from './components/Container';
import { DarkModeContext } from './context/Darkmode';
import TodosProvider from './context/Todos';

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={`App min-h-screen w-full flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800 text-black dark:text-white ${
        darkMode ? 'dark' : ''
      }`}
    >
      <TodosProvider>
        <Todo />
      </TodosProvider>
    </div>
  );
};

export default App;
