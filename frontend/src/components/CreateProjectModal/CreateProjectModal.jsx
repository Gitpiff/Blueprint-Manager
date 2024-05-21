import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/project';


const CreateProjectModal = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [budget, setBudget] = useState('');
    const [commencementDate, setCommencementDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const validate = () => {
        const errors = {};
        if (name.length < 4 || name.length > 50) {
            errors.name = 'Project Name must be between 4 and 50 characters';
        }
        if (!clientId) {
            errors.clientId = 'Client ID is required';
        }
        if (description.length < 30 || description.length > 200) {
            errors.description = 'Project Description must be between 30 and 200 characters';
        }
        if (!coverImage) {
            errors.coverImage = 'Cover Image is required';
        }
        if (!budget || budget <= 500) {
            errors.budget = 'Budget must be greater than 500';
        }
        if (!commencementDate) {
            errors.commencementDate = 'Commencement Date is required';
        }
        if (new Date(commencementDate) <= new Date()) {
            errors.commencementDate = 'Commencement Date cannot be in the past';
        }
        if (!completionDate) {
            errors.completionDate = 'Completion Date is required';
        }
        if (new Date(completionDate) <= new Date(commencementDate)) {
            errors.completionDate = 'Completion Date cannot be on or before Commencement Date';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (validate()) {
            const newProject = {
                name,
                clientId,
                description,
                coverImage,
                budget,
                commencementDate,
                completionDate
            }
        dispatch(sessionActions.createProject(newProject))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(data.errors);
                }
            });
    }
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Project Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="errors">{errors.name}</p>}
                </label>
                <label>
                    Client ID:
                    <input
                        type="number"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    />
                    {errors.clientId && <p className="errors">{errors.clientId}</p>}
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    {errors.description && <p className="errors">{errors.description}</p>}
                </label>
                <label>
                    Cover Image:
                    <input
                        type="text"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        required
                    />
                    {errors.coverImage && <p className="errors">{errors.coverImage}</p>}
                </label>
                <label>
                    Budget:
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                    {errors.budget && <p className="errors">{errors.budget}</p>}
                </label>
                <label>
                    Commencement Date:
                    <input
                        type="date"
                        value={commencementDate}
                        onChange={(e) => setCommencementDate(e.target.value)}
                        required
                    />
                    {errors.commencementDate && <p className="errors">{errors.commencementDate}</p>}
                </label>
                <label>
                    Completion Date:
                    <input
                        type="date"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        required
                    />
                    {errors.completionDate && <p className="errors">{errors.completionDate}</p>}
                </label>
                <button type="submit">Save Changes</button>
                {errors.submit && <p className="errors">{errors.submit}</p>}
            </form>
        </div>
    );
}

export default CreateProjectModal;