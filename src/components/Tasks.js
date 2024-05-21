import Task from './Task';
import "../index.css"

const Tasks = ({ tasks, onDelete, onEdit , theme}) => {
    return (
        <>
            {tasks.map((task) => (<Task key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} theme={theme}/>))}
        </>
    )
}

export default Tasks;
