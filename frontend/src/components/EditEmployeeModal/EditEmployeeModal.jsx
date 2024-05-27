import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/employee';
import '../SignupFormModal/SignupForm.css'

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
        const newErrors = {};
    
        if (!firstName) newErrors.firstName = "First Name is required";
        else if (firstName.length < 2 || firstName.length > 30) newErrors.firstName = "First Name must have between 2 and 30 characters";
    
        if (!lastName) newErrors.lastName = "Last Name is required";
        else if (lastName.length < 2 || lastName.length > 30) newErrors.lastName = "Last Name must have between 2 and 30 characters";
    
        if (!picture) newErrors.picture = "Picture is required";
        else if (!/^https?:\/\/.+\..+$/.test(picture)) newErrors.picture = "Picture must be a valid URL";
    
        if (!hireDate) newErrors.hireDate = "Hire Date is required";
        else if (new Date(hireDate) > new Date()) newErrors.hireDate = "Hire Date cannot be in the future";
    
        if (!role) newErrors.role = "Role is required";
        else if (role.length > 50) newErrors.role = "Role must not be more than 50 characters long";
    
        if (!salary) newErrors.salary = "Salary is required";
        else if (isNaN(salary) || salary < 0) newErrors.salary = "Salary must be a valid integer and not negative";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
        <div style={{backgroundColor: '#001f3f'}} className='login-modal'>
            <h2>Edit Employee</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className='errors'>{errors.firstName}</p>}
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className='errors'>{errors.lastName}</p>}
                <label>
                    Picture URL:
                    <input
                        type="text"
                        name="picture"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                        required
                    />
                </label>
                {errors.picture && <p className='errors'>{errors.picture}</p>}
                <label>
                    Hire Date:
                    <input
                        type="date"
                        name="hireDate"
                        value={hireDate}
                        onChange={(e) => setHireDate(e.target.value)}
                        required
                    />
                </label>
                {errors.hireDate && <p className='errors'>{errors.hireDate}</p>}
                <label>
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </label>
                {errors.role && <p className='errors'>{errors.role}</p>}
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </label>
                {errors.salary && <p className='errors'>{errors.salary}</p>}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditEmployeeModal;
