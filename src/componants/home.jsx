import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./home.css";
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()

  const change = () => {
    navigate('/');
  }

    return (
        <div className="background-image">
          <div className="component">
            <div className="col-12">
              <h1 class="titulo">Sistema de Controlo de Voos</h1>
              <h4 class="subtitulo">Decolando com Segurança, Pousando com Precisão!</h4>
              <div class="search-container">
                <input type="text" placeholder="Procurar"></input>
                <button type="submit" onClick={change}><FontAwesomeIcon icon={faSearch}/></button>
              </div>
            </div>
          </div>       
        </div>
      );
    }

export default Home;
