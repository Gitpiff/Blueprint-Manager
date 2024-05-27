import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getProject } from "../../store/project";
import OpenModalButton from "../OpenModalButton";
import EditProjectModal from "../EditProjectModal";
import DeleteModal from "../DeleteModal";
import EmployeeList from "../EmployeesList";
import Footer from "../Footer";

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

    const formatCurrency = (num, locale = 'en-US', currency = 'USD') => {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        });
        return formatter.format(num);
    }


    if (!project) {
        return <p>Loading project details...</p>; 
    }

    return ( project && 
        <>
        <nav className="projectNav">
            <div>
                <h2>Days Until Completion</h2>
                <h2>{daysLeft(project.commencementDate, project.completionDate)} days left!</h2>
            </div>

            <div>
                <h2>Project </h2>
                <h2>{project.name}</h2>
            </div>

            <div>
                <h2>Client Name</h2>
                <h2>{project.clientName}</h2>
            </div>

            <div>
                <h2>Budget</h2>
                <h2>{formatCurrency(project.budget)}</h2>
            </div>
        </nav>

        <div className="projectCard">
            <h1>{project.name}</h1>
            <img style={{height: '400px', width: '400px'}} src={project.coverImage} alt={project.name} />
            <h3>Description</h3>
            <p>{project.description}</p>
            <div>
                <OpenModalButton
                    buttonText="Active Staff"
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
                {/* <button>Complete</button>
                <button>Directions</button> */}
            </div>
        </div>
        <Footer />
        </>
    )
}