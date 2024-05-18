import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const NewProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    clientId: '',
    description: '',
    coverImage: '',
    budget: '',
    projectManagerId: '',
    commencementDate: '',
    completionDate: '',
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
      await dispatch(sessionActions.createProject(formData));
      navigate('/projects');
    } catch (err) {
      const data = await err.response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        {errors.name && <p className='error'>{errors.name}</p>}
        <label>
          Client ID:
          <input
            type="number"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            required
          />
        </label>
        {errors.clientId && <p className='error'>{errors.clientId}</p>}
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        {errors.description && <p className='error'>{errors.description}</p>}
        <label>
          Cover Image URL:
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            required
          />
        </label>
        {errors.coverImage && <p className='error'>{errors.coverImage}</p>}
        <label>
          Budget:
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </label>
        {errors.budget && <p className='error'>{errors.budget}</p>}
        <label>
          Project Manager ID:
          <input
            type="number"
            name="projectManagerId"
            value={formData.projectManagerId}
            onChange={handleChange}
            required
          />
        </label>
        {errors.projectManagerId && <p className='error'>{errors.projectManagerId}</p>}
        <label>
          Commencement Date:
          <input
            type="date"
            name="commencementDate"
            value={formData.commencementDate}
            onChange={handleChange}
            required
          />
        </label>
        {errors.commencementDate && <p className='error'>{errors.commencementDate}</p>}
        <label>
          Completion Date:
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
            required
          />
        </label>
        {errors.completionDate && <p className='error'>{errors.completionDate}</p>}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default NewProjectForm;
