import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

  const { pathname } = useLocation();

  // Para mudar para activo quando um link é clicado
  const isActive = (route) => {
    return route === pathname ? 'active' : '';
  };
  
    return (
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <h5><FontAwesomeIcon icon={faPlaneDeparture}/> Sistema de Controlo de Voo</h5>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/nacional" className={`nav-link ${isActive('/nacional')}`}>
                  Voos Nacionais
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/internacional')}`} to="/internacional" >
                  Voos Internacionais
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/aviao')}`} to="/aviao" >
                  Aviões
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/companhia')}`} to="/companhia" >
                  Companhias Aéreas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
export default Navbar;