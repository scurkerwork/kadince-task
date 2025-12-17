import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="app-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <header style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <h1 style={{ margin: 0 }}>Task Manager</h1>
            </header>

            <main>
                <Outlet />
            </main>

            <footer style={{ marginTop: '50px', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                <p>&copy; {new Date().getFullYear()} Task Manager App</p>
            </footer>
        </div>
    );
};

export default MainLayout;
