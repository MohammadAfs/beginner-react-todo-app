import { useContext } from 'react';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { TodosContext } from '../context/Todos';

const Form: FC<{
  visible: boolean;
}> = ({ visible }) => {
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const { dispatch } = useContext(TodosContext);
  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch({
      type: 'ADD',
      payload: {
        data: { name: nameInput, description: descriptionInput },
      },
    });
    setNameInput('');
    setDescriptionInput('');
  };
  const onNameInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget;
    setNameInput(value);
  };
  const onDescriptionInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.currentTarget;
    setDescriptionInput(value);
  };

  return (
    <form
      id="add-form"
      onSubmit={onSubmit}
      className={`${visible ? '' : 'hidden'} my-5 flex flex-col `}
    >
      <div className="flex flex-col w-full lg:flex-row mb-3 ">
        <div className="flex flex-col flex-grow mb-5 lg:mb-0">
          <label htmlFor="name" className="select-none">
            Todo name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nameInput}
            className={`border-b-2 outline-none relative focus:border-green-600 transition-all duration-300`}
            style={{ content: 'none !important' }}
            autoComplete="off"
            onChange={onNameInputChange}
            required
          />
        </div>
        <div className="flex flex-col flex-grow lg:ml-5">
          <label htmlFor="description" className="select-none">
            Todo description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={descriptionInput}
            className={`border-b-2 outline-none relative focus:border-green-600 transition-all duration-300`}
            style={{ content: 'none !important' }}
            autoComplete="off"
            onChange={onDescriptionInputChange}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white px-3 py-2 my-3 rounded-xl font-semibold flex-grow w-full
          hover:opacity-80 transition-all duration-150"
      >
        Add Todo
      </button>
    </form>
  );
};

export default Form;
