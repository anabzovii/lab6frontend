const Button = ({ color, text, onClick, theme }) => {
    return <button onClick={onClick} style={{ backgroundColor: color }} className={`btn ${theme ? 'btnDark' : ''}`}>{text}</button>
}

export default Button
