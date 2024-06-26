import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/project';
import { Link, Navigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import CreateProjectModal from '../CreateProjectModal';
import Footer from '../Footer';
//import ProfileButton from '../Navigation/ProfileButton';

const ProjectsList = () => {
    const dispatch = useDispatch();
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    const projectList = useSelector((state) => Object.values(state.project));
    //const sessionProjectManager = useSelector((state) => Object.values(state.projectManager));

    
    //console.log(projectList);
    
    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])
    
    if(!sessionProjectManager) return <Navigate to="/" replace={true} />;
    //<ProfileButton sessionProjectManager={sessionProjectManager} />
    // Get the correct date format
    function getYearMonthDay(dateString) {
        if (!dateString) return 'N/A'; // Handle undefined dates
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        
        return `${year}-${formattedMonth}-${formattedDay}`;
    }


    return (
        <>
            <h1 className='activeProjects'> Active Projects</h1>
            <OpenModalButton
                buttonText="Add Project"
                modalComponent={<CreateProjectModal />}
            />
            <div className='card-container'>
                {projectList?.map((project) => (
                    <div className='link' key={project.id}>
                        <Link to={`/projects/${project.id}`}>
                            <div className='card'>
                                <h2>Project Name: {project.name}</h2>
                                <h2>Client Name: {project.clientName}</h2>
                                <h3>Start Date: {getYearMonthDay(project.commencementDate)}</h3>
                                <h3>Completion Date: {getYearMonthDay(project.completionDate)}</h3>
                                <img className="card-image hover-saturation" src={project.coverImage} alt={project.name}/>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default ProjectsList;