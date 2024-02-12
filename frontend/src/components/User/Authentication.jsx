import React from 'react';
import './User.css';
import Login from '../User/Login.jsx';
import Register from '../User/Register.jsx';

const Authentication = ({user}) => {
    function CheckPath() {
        if (window.location.pathname === '/register') {
            return <Register user={user} />;
        } else if (window.location.pathname === '/login') {
            return <Login user={user}/>;
        }
    }
    return (

        <div className="parent">
            <a href="/"><i className="fa-solid fa-left-long fa-xl" style={{ position: 'absolute', top: '5%', left: '2%', color: '#ffffff' }}></i></a>

            <div className="leftpart-auth">
                <div className='my-3 d-flex justify-content-center align-items-center flex-column'>
                    <div className="icon">
                        <i className="fa-solid fa-code fa-2xl" style={{ color: '#000000' }}></i>
                    </div>
                    <h1 className='text-center'>Algocraft</h1>
                </div>
            </div>
            <div className="rightpart-auth flex-column">
                <h3 className='text-decoration-underline'>Create an Account or login</h3>
                <CheckPath />
            </div>
        </div>

    );
};

export default Authentication;
