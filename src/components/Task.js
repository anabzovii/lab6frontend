import {FaPencilAlt, FaTimes} from 'react-icons/fa';
import "../index.css"

const Task = ({task, onDelete, onEdit, theme}) => {
    const role = localStorage.getItem('role');
    return (
        <div>
            <div className="task">
                <div>
                    <p className="taskName">
                        <span className="textBold">Book name:</span> {task.text}
                    </p>
                    <p className="taskDate"><span className="textBold">Author:</span> {task.day}</p>
                    <p className="taskDate"><span className="textBold">Category:</span> {task.category}</p>
                </div>
                {role === "ADMIN" &&
                <div>
                        <p><FaTimes onClick={() => onDelete(task.id)} className="delIcon"/></p>
                        <p><FaPencilAlt onClick={() => onEdit(task.id)} className="editIcon" /></p>
                </div>
                }
            </div>
        </div>
    )
}

export default Task
