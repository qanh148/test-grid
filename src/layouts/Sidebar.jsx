
import React from 'react';
import {Link} from "react-router-dom"; 

function Sidebar() {
  return (
    
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      
      
      {/* Sidebar */}
      <div className="sidebar">
        
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
                   with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Home
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Users List</p>
                  </Link>
                </li>
                
                
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
    
  );
}
export default Sidebar;
