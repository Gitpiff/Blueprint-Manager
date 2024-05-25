import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/employee';

const AddEmployeeModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        picture: '',
        hireDate: '',
        role: '',
        salary: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            await dispatch(sessionActions.createEmployee(formData))
            alert('New Employee Added!')
            closeModal()
        } catch (err) {
           
          const data = await err.response.json()
          if (data && data.errors) {
              setErrors(data.errors);
          }
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
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.firstName && <p className='error'>{errors.firstName}</p>}
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.lastName && <p className='error'>{errors.lastName}</p>}
                <label>
                    Picture URL:
                    <input
                        type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.picture && <p className='error'>{errors.picture}</p>}
                <label>
                    Hire Date:
                    <input
                        type="date"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.hireDate && <p className='error'>{errors.hireDate}</p>}
                <label>
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.role && <p className='error'>{errors.role}</p>}
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
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
