import { useState } from 'react';

const AddTask = ({ onSave, theme }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [category, setCategory] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        onSave({ text, day, category });
        setText('');
        setDay('');
        setCategory('');
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Book name</label>
                <input type="text" placeholder="name" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Author</label>
                <input type="text" placeholder="author" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Category</label>
                <input type="text" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

            <input type="submit" className="btn btn-block" value="Save Book" />
        </form>
    )
}

export default AddTask
