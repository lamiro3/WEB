import CreateToDo from "./CreateToDo";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, newCatState } from "./atoms";
import ToDo from "./ToDo";
import React, { useState } from "react";

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    localStorage.setItem('savedToDos', JSON.stringify(toDos));
    const [category, setCategory] = useRecoilState(categoryState);
    const [newCat, setNewCat] = useRecoilState(newCatState);
    const [value, setValue] = useState('');
    const [isAddCat, setIsAddCat] = useState(false);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    }
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value }
        } = event;
        setValue(value);
    }

    const onClick = () => {
        setIsAddCat(true);
        setNewCat((pre) => [...pre, value]);
    }

    return <div>
        <h1>To Dos</h1>
        <button onClick={onClick}>Create a new category</button>
        <input onChange={onChange} placeholder="Create a new category"/>
        <hr />
        <select value={category} onInput={onInput}>
            <option value='TO_DO'>To Do</option>
            <option value='DOING'>Doing</option>
            <option value='DONE'>Done</option>
            {newCat.map((cat) => isAddCat ? <option value={cat}>{cat}</option> : null)}
        </select>
        <CreateToDo/>
        {toDos.map((toDo) => <ToDo key={toDo.id} {...toDo}/>)}
    </div>;
}

export default ToDoList;

// interface IForm {
//     Email: string;
//     FirstName: string;
//     LastName: string;
//     Username: string;
//     Password: string;
//     PasswordConfimation: string;
//     extraError?: string;
// }

// function ToDoList(){
//     const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
//         defaultValues: {
//             Email: '@naver.com',
//         }
//     });
//     const onValid = (data:IForm) => {
//         if(data.Password !== data.PasswordConfimation){
//             setError('PasswordConfimation', {message:'Password are not the same'}, {shouldFocus:true})
//         }
//         // setError('extraError', {message: 'Server offline.'})
//     }
//     console.log(errors);
//     return <div>
//         <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onValid)}>
//             <input {...register('Email', {required: 'Email is required', pattern:{value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: 'Only naver.com emails allowed'},})} placeholder="Email"/>
//             <span>{errors.Email?.message}</span>
//             <input {...register('FirstName', {required: true, validate: {noLamiro: (value) => value.includes('lamiro') ? 'no lamiro allowed' : true, },})} placeholder="First Name"/>
//             <input {...register('LastName', {required: true})} placeholder="Last Name"/>
//             <input {...register('Username', {required: true, minLength: 10})} placeholder="Username"/>
//             <input {...register('Password', {required: true, minLength: 5})} placeholder="Password"/>
//             <input {...register('PasswordConfimation', {required: 'Password is required', minLength: {value: 5, message: 'Your password is too short'}})} placeholder="Password Confimation"/>
//             <span>{errors.PasswordConfimation?.message}</span>
//             <button>Add</button>
//             <span>{errors?.extraError?.message}</span>
//         </form>
//     </div>
// }