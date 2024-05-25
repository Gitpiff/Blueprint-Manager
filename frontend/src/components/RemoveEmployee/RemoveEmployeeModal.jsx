import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteEmployee } from "../../store/employee";

const RemoveEmployeeModal = ({employee}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yes = () => {
        return dispatch(deleteEmployee(employee.id))
            .then(closeModal())
    }
    return (
        <div className="delete">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove {employee.firstName} from this Project?</p>
        <div className="confirm-delete">
            <button className="yes-delete" onClick={yes}>Yes (Remove {employee.firstName})</button>
            <button className="no-delete" onClick={closeModal}>No (Keep {employee.firstName})</button>
        </div>
    </div>
    )
}

export default RemoveEmployeeModal;