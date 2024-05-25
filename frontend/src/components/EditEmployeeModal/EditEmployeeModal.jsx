import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/employee';

const EditEmployeeModal = ({ employee }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [firstName, setFirstName] = useState(employee?.firstName || '');
    const [lastName, setLastName] = useState(employee?.lastName || '');
    const [picture, setPicture] = useState(employee?.picture || '');
    const [hireDate, setHireDate] = useState(employee?.hireDate || '');
    const [role, setRole] = useState(employee?.role || '');
    const [salary, setSalary] = useState(employee?.salary || '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!employee) {
            dispatch(sessionActions.getEmployee(employee.id));
        } else {
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setPicture(employee.picture);
            setHireDate(employee.hireDate);
            setRole(employee.role);
            setSalary(employee.salary);
        }
    }, [dispatch, employee]);

    const validate = () => {
        const errors = {};
        if (!firstName) errors.firstName = 'First Name is required';
        else if (firstName.length < 2 || firstName.length > 30) errors.firstName = 'First Name must have between 2 and 30 characters';
    
        if (!lastName) errors.lastName = 'Last Name is required';
        else if (lastName.length < 2 || lastName.length > 30) errors.lastName = 'Last Name must have between 2 and 30 characters';
    
        if (!hireDate) errors.hireDate = 'Hire Date is required';
        else if (new Date(hireDate) > new Date()) errors.hireDate = 'Hire Date cannot be in the future';
    
        if (!role) errors.role = 'Role is required';

        if (!picture) errors.picture = 'Picture is required';
    
        if (!salary) errors.salary = 'Salary is required';
        else if (isNaN(salary)) errors.salary = 'Salary must be a number';
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'picture':
                setPicture(value);
                break;
            case 'hireDate':
                setHireDate(value);
                break;
            case 'role':
                setRole(value);
                break;
            case 'salary':
                setSalary(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (validate()) {
            const updatedEmployee = {
                id: employee.id,
                firstName,
                lastName,
                picture,
                hireDate,
                role,
                salary
            };

            dispatch(sessionActions.employeeUpdate(updatedEmployee))
                .then(() => {
                    dispatch(sessionActions.getEmployee(employee.id));
                    closeModal();
                })
                .catch((err) => {
                    console.error("Failed to update employee:", err);
                    setErrors({ submit: "Failed to update employee" });
                });
        }
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p>{errors.firstName}</p>}
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p>{errors.lastName}</p>}
                </div>
                <div>
                    <label>Picture URL</label>
                    <input
                        type="text"
                        name="picture"
                        value={picture}
                        onChange={handleChange}
                    />
                    {errors.picture && <p>{errors.picture}</p>}
                </div>
                <div>
                    <label>Hire Date</label>
                    <input
                        type="date"
                        name="hireDate"
                        value={hireDate}
                        onChange={handleChange}
                    />
                    {errors.hireDate && <p>{errors.hireDate}</p>}
                </div>
                <div>
                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={role}
                        onChange={handleChange}
                    />
                    {errors.role && <p>{errors.role}</p>}
                </div>
                <div>
                    <label>Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={salary}
                        onChange={handleChange}
                    />
                    {errors.salary && <p>{errors.salary}</p>}
                </div>
                <button type="submit">Save</button>
            </form>
            {errors.submit && <p>{errors.submit}</p>}
        </div>
    );
};

export default EditEmployeeModal;
