import Todo from './components/Container';
import TodosProvider from './context/Todos';

const App = () => {
  return (
    <div className="App min-h-screen w-full flex justify-center items-center">
      <TodosProvider>
        <Todo items={[]} />
      </TodosProvider>
      <div></div>
    </div>
  );
};

export default App;
