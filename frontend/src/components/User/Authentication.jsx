import React from 'react';
import './User.css';
import Login from '../User/Login.jsx';
import Register from '../User/Register.jsx';

function CheckPath() {
    if (window.location.pathname === '/register') {
        return <Register />;
    } else if (window.location.pathname === '/login') {
        return <Login />;
    }
}

const Authentication = () => {
    return (

        <div className="parent">
            <div class="leftpart-auth">
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <div className="icon">
                        <i class="fa-solid fa-code fa-2xl" style={{ color: '#000000' }}></i>
                    </div>
                    <h1 className='text-center'>Algocraft</h1>
                </div>
            </div>
            <div className="rightpart-auth flex-column">
                <a href="/"><i class="fa-solid fa-left-long fa-xl" style={{ position: 'absolute', top: '5%', left: '2%', color: '#ffffff' }}></i></a>
                <h3 className='text-decoration-underline'>Create an Account or login</h3>
                <div >
                </div>
                <CheckPath />
            </div>
        </div>

    );
};

export default Authentication;
