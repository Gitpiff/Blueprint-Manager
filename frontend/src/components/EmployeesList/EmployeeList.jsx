import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../store/employee";
import OpenModalButton from "../OpenModalButton";
import EditEmployeeModal from "../EditEmployeeModal";
import RemoveEmployeeModal from "../RemoveEmployee";
import AddEmployeeForm from "../AddEmployeeForm";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const employeeList = useSelector((state) => Object.values(state.employee));
    
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    useEffect(() => {
        if (employeeList.length > 0 && !employee) {
            setEmployee(employeeList[0]);
        }
    }, [employeeList, employee]);

    const getNext = () => {
        if (employee && employeeList.length > 1) {
            const currentIndex = employeeList.findIndex(e => e.id === employee.id);
            const nextIndex = (currentIndex + 1) % employeeList.length;
            setEmployee(employeeList[nextIndex]);
        }
    };

    const getPrev = () => {
        if (employee && employeeList.length > 1) {
            const currentIndex = employeeList.findIndex(e => e.id === employee.id);
            const prevIndex = (currentIndex - 1 + employeeList.length) % employeeList.length;
            setEmployee(employeeList[prevIndex]);
        }
    };

    const getYearMonthDay = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatCurrency = (num, locale = 'en-US', currency = 'USD') => {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
        });
        return formatter.format(num);
    }

    return (
        employee && (
            <>
                <div className="employeeCard">
                    <OpenModalButton
                        className= "addEmployeeBtn"
                        buttonText='Add New Employee'
                        modalComponent={<AddEmployeeForm />}
                    />
                    
                    <div>
                        <div className="card-container">
                        <button style={{height: '100px'}} onClick={getPrev}><FaLongArrowAltLeft className="carouselIcon" /></button>
                            <div className="card">
                                <img className="card-image" src={employee.picture} alt={employee.name} />
                                <h3>First Name: {employee.firstName}</h3>
                                <h3>Last Name: {employee.lastName}</h3>
                                <h3>Hire Date: {getYearMonthDay(employee.hireDate)}</h3>
                                <h3>Role: {employee.role}</h3>
                                <h3>Annual Salary: {formatCurrency(employee.salary)}</h3>
                            </div>
                        <button style={{height: '100px'}}  onClick={getNext}><FaLongArrowAltRight className="carouselIcon" /></button>
                        </div>
                    </div>
                    <div className="employeeCardBtns">
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<EditEmployeeModal employee={employee} />}
                        />
                        <OpenModalButton
                            buttonText="Remove"
                            modalComponent={<RemoveEmployeeModal employee={employee} />}
                        />
                    </div>
                </div>
            </>
        )
    );
};

export default EmployeeList;
