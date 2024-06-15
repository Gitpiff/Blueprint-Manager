import { csrfFetch } from './csrf';

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_DETAILS = 'projects/GET_PROJECT_DETAILS';
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT';
const DELETE_PROJECT = 'projects/DELETE_PROJECT';
const CREATE_PROJECT = 'projects/CREATE_PROJECT';

// Action Creator
const getAllProjects = (projects) => {
    return {
        type: GET_ALL_PROJECTS, 
        projects
    };
};

const getSingleProject = (project) => {
    return {
        type: GET_PROJECT_DETAILS,
        project
    }
};

const updateProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project
    }
};

const removeProject = (project) => {
    return {
        type: DELETE_PROJECT,
        project
    }
};

const addProject = (project) => {
    return {
        type: CREATE_PROJECT,
        project
    }
};

// Thunks
export const getProjects = () => async (dispatch) => {
    const response = await csrfFetch('/api/projects');
    //console.log(`Thunk response ${response}`)
    if (response.ok) {
        const projects = await response.json();
        dispatch(getAllProjects(projects));
    }
};

export const getProject = (projectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`)
    //console.log(`get project ${response}`)

    if (response.ok) {
        const project = await response.json();
        //console.log(`store ${project}`)
        dispatch(getSingleProject(project))
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const projectUpdate = (project) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(project)
    })

    if (response.ok) {
        const updatedProject = await response.json();
        dispatch(updateProject(updatedProject));
        return updatedProject;
    }
};

export const deleteProject = (projectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeProject(projectId))
    }
};

export const createProject = (projectData) => async (dispatch) => {
    const response = await csrfFetch('/api/projects/new', {
        method: 'POST',
        body: JSON.stringify(projectData)
    });

    if (response.ok) {
        const newProject = await response.json();
        dispatch(addProject(newProject));
        return newProject;
    } else {
        const errors = await response.json();
        return errors;
    }
};


// Reducer
const projectReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS: {
            const projectState = {};
            action.projects.forEach((project) => {
                projectState[project.id] = project;
            });
            return projectState; 
        }
        case GET_PROJECT_DETAILS: {
            return { ...state, [action.project.id]: action.project}
        }
        case UPDATE_PROJECT: {
            return { ...state, [action.project.id]: action.project}
        }
        case DELETE_PROJECT: {
            const newState = {...state};
            delete newState[action.project.id];
            return newState;
        }
        case CREATE_PROJECT: {
            return { ...state, [action.project.id]: action.project}
        }
        default:
            return state;
    }
};

export default projectReducer;

