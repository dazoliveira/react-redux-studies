// Libary Code
function createStore(reducer) {


    // The store should have four parts
    // 1. The state
    // 2. Get the state
    // 3. Listening  to changes on the state
    // 4. Update the state
    let state
    let listeners = []

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    const getState = () => state

    return {
        getState,
        subscribe,
        dispatch,
    }
}

// App code
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id)
        case 'TOGGLE_TODO':
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, state, { complete: !todo.complete }))
        default:
            return state
    }
}

function goals(state=[], action){
    switch (action.type){
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state
    }
}

function app(state= {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app)
store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Walk the dog',
        complete: false,
    }
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 1,
        name: 'Walk the dog',
        complete: false,
    }
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 2,
        name: 'Read Book',
        complete: false,
    }
})

store.dispatch({
    type: 'REMOVE_TODO',
    id: 0
})

store.dispatch({
    type: 'TOGGLE_TODO',
    id: 2
})

store.dispatch({
    type: 'ADD_GOAL',
    goal:{
        id: 0,
        name:'Learn React-Redux'
    }
})

store.dispatch({
    type: 'ADD_GOAL',
    goal:{
        id: 1,
        name:'Lose 20 pounds'
    }
})

store.dispatch({
    type: 'REMOVE_GOAL',
    id:1
})