import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IToDo, toDoState, newCatState } from './atoms';

function ToDo({text, category, id}: IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const newCat = useRecoilValue(newCatState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget : {name},
        } = event;
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id); //findIndex 내의 판별함수가 참이 되었을때 해당 배열의 index를 반환
            const newToDo = {text, id, category:name as any};
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
        });
    }
    return (
    <li key={id}>
        <span>{text}</span>
        {/* 인자가 있는 onClick event 처리 방법 -> but 보통 onclick에 직접 인자를 보내는 방법을 더 선호함*/}
        { category !== 'DOING' && <button name='DOING' onClick={onClick}>Doing</button>}
        { category !== 'TO_DO' && <button name='TO_DO' onClick={onClick}>To Do</button>}
        { category !== 'DONE' && <button name='DONE' onClick={onClick}>Done</button>}
        { newCat.map((cat) => category !== cat && <button name={cat} onClick={onClick}>{cat}</button>)}
    </li>)
}

export default ToDo;