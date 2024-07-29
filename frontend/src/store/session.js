import { csrfFetch } from './csrf';

const SET_PROJECTMANAGER = 'session/setProjectManager';
const REMOVE_PROJECTMANAGER = 'session/removeProjectManager';

// Actions
export const setProjectManager = (projectManager) => {
    return {
        type: SET_PROJECTMANAGER,
        payload: projectManager
    };
};

export const removeProjectManager = () => {
    return {
        type: REMOVE_PROJECTMANAGER
    };
};



//Thunks
export const login = (projectManager) => async (dispatch) => {
    const { credential, password } = projectManager;
    const response = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })

    if(response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(setProjectManager(data.projectManager));
        return response
    } else {
        const errors = await response.json();
        return errors;
    }
}


export const signup = (projectManager) => async (dispatch) => {
    const { firstName, lastName, username, email, companyName, industrySector, password } = projectManager;
    //console.log(projectManager);
    const response = await csrfFetch('api/projectManagers', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            companyName,
            industrySector,
            password
        })
    });
    if(response.ok) {
        const data = await response.json();
        //console.log(data)
        dispatch(setProjectManager(data.projectManager));
        return response
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: 'DELETE'
    })

    dispatch(removeProjectManager())
    return response
}

export const restoreProjectManager = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setProjectManager(data.projectManager));
    return response;
};

const initialState = { projectManager: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PROJECTMANAGER:
        return { ...state, projectManager: action.payload };
      case REMOVE_PROJECTMANAGER:
        return { ...state, projectManager: null };
      default:
        return state;
    }
};

export default sessionReducer;
