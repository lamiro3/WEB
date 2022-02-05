import {useForm} from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from './atoms';

interface IForm {
    toDo: string;
}

function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState); //js의 useState와 매우 유사함!
    const savedToDos = localStorage.getItem('savedToDos');

    const category = useRecoilValue(categoryState);

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<IForm>();

    const handleValid = ({toDo}:IForm) => {
        if (savedToDos !== null){
            const parsedToDos = JSON.parse(savedToDos);
            setToDos(parsedToDos);
        }
        setToDos(oldToDos => [{text:toDo, id: Date.now() , category}, ...oldToDos]) //oldToDos는 Array, ...oldToDos는 array내의 모든 elements를 뜻함[ES6 syntax]
        setValue('toDo', ''); // toDo를 ''로 바꿈!!
    }

    return (
    <form onSubmit={handleSubmit(handleValid)}>
        <input {...register('toDo', {
            required: 'Please write a To Do',
        })} placeholder="Write a to do"/>
        <button>Add</button>
    </form>
    );
}

export default CreateToDo;