import { Dispatch, MouseEventHandler, SetStateAction, useContext } from 'react';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { TodosContext } from '../context/Todos';

const Form: FC<{
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}> = ({ visible, setVisibility }) => {
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const { dispatch } = useContext(TodosContext);
  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch({
      type: 'todos/ADD',
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
  const onClose: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setVisibility(false);
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
            className={`border-b-2 outline-none relative focus:border-green-600 transition-all duration-300 bg-inherit`}
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
            className={`border-b-2 outline-none relative focus:border-green-600 transition-all duration-300 bg-inherit`}
            style={{ content: 'none !important' }}
            autoComplete="off"
            onChange={onDescriptionInputChange}
            required
          />
        </div>
      </div>
      <div className="flex items-stretch my-2">
        <button
          type="submit"
          className="bg-green-700 text-white px-3 py-2 rounded-xl font-semibold flex-grow w-full
        hover:opacity-80 transition-all duration-150 mr-1 rounded-r-none"
        >
          Add Todo
        </button>
        <button
          className="bg-red-600 text-white font-semibold px-3 py-2
          rounded-xl rounded-l-none
          min-w-[20%]
          hover:opacity-80 transition-all duration-150"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Form;
