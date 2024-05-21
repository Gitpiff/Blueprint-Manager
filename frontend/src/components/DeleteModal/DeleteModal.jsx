import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProject } from "../../store/project";

const DeleteModal = ({projectId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    

    const yes = () => {
        return dispatch(deleteProject(projectId))
            .then(() => {
                closeModal
                window.location.href = '/projects'
            })
    }

    return (
        <div className="delete">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this Project?</p>
            <div className="confirm-delete">
                <button className="yes-delete" onClick={yes}>Yes (Delete Project)</button>
                <button className="no-delete" onClick={closeModal}>No (Keep Project)</button>
            </div>
        </div>
    )
}

export default DeleteModal;