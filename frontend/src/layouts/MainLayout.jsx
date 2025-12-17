import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <header style={{
                marginBottom: '30px',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ margin: 0, color: 'var(--primary-color)' }}>MyTodo</h1>
                <button
                    onClick={toggleTheme}
                    className="btn btn-secondary"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </header>

            <main className="fade-in">
                <Outlet />
            </main>

            <footer style={{ marginTop: '50px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>&copy; {new Date().getFullYear()} MyTodo</p>
            </footer>
        </div>
    );
};

export default MainLayout;
