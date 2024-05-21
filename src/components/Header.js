import React from 'react';
import Button from './Button';
import "../index.css";

const Header = ({ showForm, toggleTheme, changeTextAndColor, theme }) => {
    const role = localStorage.getItem('role');
    return (
        <header className="header">
            <h2 className="app-header">My Library</h2>
            {role === "ADMIN" && <Button onClick={showForm} color={changeTextAndColor ? 'red' : 'green'} text={changeTextAndColor ? 'Close' : 'Add'} theme={theme}/>}
            <Button onClick={toggleTheme} text={"ChangeTheme"} theme={theme}/>
        </header>
    )
}

export default Header;
