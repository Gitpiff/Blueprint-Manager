import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getProject } from "../../store/project";

export default function ProjectDetails() {
    const dispatch = useDispatch();

    //Get ProjectId
    const { projectId } = useParams();
    //console.log(projectId)

    // Get Project from redux store
    const project = useSelector(state => state.project ? state.project[projectId] : null);
    //console.log(project)

    // Get Selected Project
    useEffect(() => {
        if (projectId) {
            //console.log(`useEffect ${projectId}`)
            dispatch(getProject(projectId));
        }
    }, [dispatch, projectId]);

    if (!project) {
        return <p>Loading project details...</p>; 
    }

    return ( project && 
        <>

            <h1>{project.name}</h1>
            <h2>{project.description}</h2>
        </>
    )
}