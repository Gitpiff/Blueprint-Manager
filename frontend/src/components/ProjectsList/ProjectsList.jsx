import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/project';
import './ProjectsList.css'

const ProjectsList = () => {
    const dispatch = useDispatch();
    const projectList = useSelector((state) => Object.values(state.project));
    console.log(projectList);

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch])

    // Get the correct date format
    function getYearMonthDay(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate();
        
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        
        return `${year}-${formattedMonth}-${formattedDay}`;
    }


    return (
        <>
            <h1> Active Projects</h1>
            <div className='project-card-container'>
                {projectList?.map((project) => (
                    <div key={project.id}>
                        <div className='card'>
                            <h2>Project Name: {project.name}</h2>
                            <h2>Client: {project.clientId}</h2>
                            <h3>Start Date: {getYearMonthDay(project.commencementDate)}</h3>
                            <h3>Completion Date: {getYearMonthDay(project.completionDate)}</h3>
                            <img style={{ height: '300px', width: '300px'}} src={project.coverImage} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProjectsList;