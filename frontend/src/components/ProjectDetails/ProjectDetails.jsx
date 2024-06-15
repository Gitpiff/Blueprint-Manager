import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { getProject } from "../../store/project";
import OpenModalButton from "../OpenModalButton";
import EditProjectModal from "../EditProjectModal";
import DeleteModal from "../DeleteModal";
import EmployeeList from "../EmployeesList";
import Footer from "../Footer";
import CalculatorModal from "../Calculator/Calculator";
import Map from "../Map";

export default function ProjectDetails() {
    const dispatch = useDispatch();
    const sessionProjectManager = useSelector((state) => state.session.projectManager);
    const { projectId } = useParams();

    const project = useSelector(state => state.project ? state.project[projectId] : null);

    useEffect(() => {
        if (projectId) {
            dispatch(getProject(projectId));
        }
    }, [dispatch, projectId]);

    if (!sessionProjectManager) return <Navigate to="/" replace={true} />;

    const totalDays = (commencementDate, completionDate) => {
        const startDate = new Date(commencementDate);
        const endDate = new Date(completionDate);
        const timeDifference = endDate - startDate;
        const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return totalDays;
    }

    const daysLeft = (completionDate) => {
        const endDate = new Date(completionDate);
        const now = new Date();
        const timeDifference = endDate - now;
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

    const getYearMonthDay = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        return `${formattedMonth}-${formattedDay}-${year}`;
    }


    if (!project) {
        return <p>Loading project details...</p>;
    }

    return (project &&
        <>
            <nav className="projectNav">
                    {/* {renderTrafficLight(90)} */}
                <div className="traffic-light-container">

                </div>
                <div id="lightsContainer">
                        <div className="trafficLight">
                            <div id="redLight" className="light"></div>
                            <div id="orangeLight" className="light"></div>
                            <div id="greenLight" className="light"></div>
                        </div>
                </div>
                <div>
                    <h2>Days Until Completion</h2>
                    <h2>You have {totalDays(project.commencementDate, project.completionDate)} days to complete</h2>
                    <h3>Days Left: {daysLeft(project.completionDate)}</h3>
                </div>

                <div>
                    <h2>Project </h2>
                    <h2>{project.name}</h2>
                    <h4>Start Date: {getYearMonthDay(project.commencementDate)}</h4>
                </div>

                <div>
                    <h2>Client Name</h2>
                    <h2>{project.clientName}</h2>
                    <h4>Completion Date: {getYearMonthDay(project.completionDate)}</h4>
                </div>

                <div>
                    <h2>Budget</h2>
                    <h2>{formatCurrency(project.budget)}</h2>
                </div>
            </nav>

            <div className="projectCard">
                <h1>{project.name}</h1>
                <div className="calc-img-container">
                    <div>
                        <CalculatorModal />
                    </div>
                    <img className="hover-saturation" style={{ height: '500px', width: '500px' }} src={project.coverImage} alt={project.name} />
                    <div style={{width: "400px"}}>
                        <Map />
                    </div>
                </div>
                <h3>Description</h3>
                <p>{project.description}</p>
                <div>
                    <OpenModalButton
                        buttonText="Active Staff"
                        modalComponent={<EmployeeList />}
                    />

                    <OpenModalButton
                        buttonText="Update"
                        modalComponent={<EditProjectModal project={project} />}
                    />

                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteModal projectId={project.id} />}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}