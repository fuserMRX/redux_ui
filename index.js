
// different types of events/actions
{
    type: 'ADD_TODO',
        todo: {
        id: 0,
            name: 'Learn Redux',
            complete: false,
    }
}

{
    type: 'REMOVE_TODO',
        id: 0,
}

{
    type: 'TOGGLE_TODO',
        id: 0,
}

{
    type: 'ADD_GOAL',
        goal: {
        id: 0,
            name: 'Run a Marathon'
    }
}

{
    type: 'REMOVE_GOAL',
        id: 0
}

// reducer
function todos(state = [], action) {
    if (action.type === 'ADD_TODO') {
        return state.concat([action.todo]);
    }
}

function createStore(reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to changes on the state
    // 4. Update the state
    let state;
    let listeners = [];

    const getState = () => state;
    const subscribe = (listener) => {
        // subscribe
        listeners.push(listener);
        return () => {
            // unsubscribe
            listeners = listeners.filter((l) => l !== listener);
        }
    };

    const dispatch = (action) => {
        // 1 - call todos
        state = reducer(state, action);
        // 2 - loop over listeners and invoke them
        listeners.forEach((listener) => listener());
    };

    return {
        getState,
        subscribe,
        dispatch,
    }
}

const store = createStore(todos);

// whenever state changes inside a store we call a function inside
const unsubscribe = store.subscribe(() => {

});

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false,
    }
})