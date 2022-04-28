// rxslice u grvuma
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://retoolapi.dev/OWyVRD/todos'

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
    async () => {
        const response = await fetch(url);
        if (response.ok) {
            const todos = await response.json();
            return { todos }
        }
    }
);

export const addTodosAsync = createAsyncThunk('todos/addTodosAsync',
    async (payload) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: payload.title })
        });

        if (response.ok) {
            const todo = await response.json();
            return { todo }
        }
    }
);

export const toggleCompleteAsync = createAsyncThunk('todos/completeTodosAsync',
    async (payload) => {
        const response = await fetch(`${url}/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: payload.completed })
        });

        if (response.ok) {
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed }
        }
    }
);

export const deleteTodosAsync = createAsyncThunk('todos/deleteTodosAsync',
    async (payload) => {
        const response = await fetch(`${url}/${payload.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return { id: payload.id }
        }
    }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    // reducers: {
    //     addTodo: (state, action) => {
    //         const newTodo = {
    //             id: Date.now(),
    //             title: action.payload.title,
    //             completed: false
    //         };
    //         state.push(newTodo);
    //     },
    //     toggleCompleted: (state, action) => {
    //         const index = state.findIndex(
    //             (todo) => todo.id === action.payload.id
    //         );
    //         state[index].completed = action.payload.completed
    //     },
    //     editTodo: (state, action) => {

    //     },
    //     deleteTodo: (state, action) => {
    //         return state.filter((todo) => todo.id !== action.payload.id)
    //     }
    // },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action) => {
            return action.payload.todos;
        },
        [addTodosAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed
        },
        [deleteTodosAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    }
});

// export const { addTodo, toggleCompleted, editTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer