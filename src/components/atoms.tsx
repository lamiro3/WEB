import { atom, selector } from 'recoil'; //selector = atom의 output을 변형하는 것!

type categories = 'TO_DO'|'DOING'|'DONE';

export interface IToDo {
    id: number;
    text: string;
    category: 'TO_DO'|'DOING'|'DONE';
}

export const categoryState = atom<categories>({
    key:'category',
    default:'TO_DO'
});

export const toDoState = atom<IToDo[]>({
    key: 'toDo',
    default: [],
});

export const newCatState = atom<string[]>({
    key:'newCat',
    default: [],
})

export const toDoSelector = selector({
    key:'toDoSelector',
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    }
})