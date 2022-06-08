import React  from 'react';
import { Link } from 'react-router-dom';

export const AppTopbar = (props) => {

    return (
        <div className="layout-topbar">
            <button type="button" className="p-link layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>
            <Link to="/" className="layout-topbar-logo">
                <img src={'assets/layout/images/logo-white.svg'} alt="logo"/>
            </Link>        
        </div>
    );
}
