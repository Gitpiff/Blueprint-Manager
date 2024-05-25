import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getProject } from "../../store/project";
import OpenModalButton from "../OpenModalButton";
import EditProjectModal from "../EditProjectModal";
import DeleteModal from "../DeleteModal";
import EmployeeList from "../EmployeesList";

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

    const daysLeft = (commencementDate, completionDate) => {
        const startDate = new Date(commencementDate);
        const endDate = new Date(completionDate);

        const timeDifference = endDate - startDate;

        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return daysLeft;
    }


    if (!project) {
        return <p>Loading project details...</p>; 
    }

    return ( project && 
        <>
        <nav className="projectNav">
            <h2>There are {daysLeft(project.commencementDate, project.completionDate)} days left!</h2>
            <h2>{project.name}</h2>
            <h2>{project.clientId}</h2>
            <h2>{project.budget}</h2>
        </nav>

        <div className="projectCard">
            <h1>{project.name}</h1>
            <img style={{height: '400px', width: '400px'}} src={project.coverImage} alt={project.name} />
            <h3>Description</h3>
            <p>{project.description}</p>
            <div>
                <OpenModalButton
                    buttonText="Staff"
                    modalComponent={<EmployeeList />}
                />
                
                <OpenModalButton
                    buttonText="Update"
                    modalComponent={<EditProjectModal project={project}/>}
                />
                
                 <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteModal projectId={project.id}/>}
                />
                <button>Complete</button>
                <button>Directions</button>
            </div>
        </div>

        </>
    )
}