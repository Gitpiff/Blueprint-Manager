import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/employee';

const AddEmployeeModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [picture, setPicture] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');

    const [errors, setErrors] = useState({});

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
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if(validate()) {
          const newEmployee = {
            firstName,
            lastName,
            picture,
            hireDate,
            role,
            salary
          }

        dispatch(sessionActions.createEmployee(newEmployee))
          .then(closeModal)
              .catch(async (res) => {
                  const data = await res.json();
                  if (data?.errors) {
                      setErrors(data.errors);
                  }
              });
        }
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h1>Add New Employee</h1>
            <form onSubmit={handleSubmit}>
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
                {errors.firstName && <p className='error'>{errors.firstName}</p>}
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
                {errors.lastName && <p className='error'>{errors.lastName}</p>}
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
                {errors.picture && <p className='error'>{errors.picture}</p>}
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
                {errors.hireDate && <p className='error'>{errors.hireDate}</p>}
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
                {errors.role && <p className='error'>{errors.role}</p>}
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
                {errors.salary && <p className='error'>{errors.salary}</p>}
                <button type="submit">Add New Employee</button>
            </form>
        </div>
    );
}

export default AddEmployeeModal;
