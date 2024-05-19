import { csrfFetch } from './csrf';

const GET_ALL_PROJECTS = 'projects/GET_ALL_PROJECTS';
const GET_PROJECT_DETAILS = 'projects/GET_PROJECT_DETAILS';

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

// Thunks
export const getProjects = () => async (dispatch) => {
    const response = await csrfFetch('/api/projects');
    console.log(`Thunk response ${response}`)
    if (response.ok) {
        const projects = await response.json();
        dispatch(getAllProjects(projects));
    }
};

export const getProject = (projectId) => async (dispatch) => {
    const response = await csrfFetch(`/api/projects/${projectId}`)
    console.log(`get project ${response}`)

    if (response.ok) {
        const project = await response.json();
        console.log(`store ${project}`)
        dispatch(getSingleProject(project))
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
        default:
            return state;
    }
};

export default projectReducer;

