import {Modal, Button} from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
    return (
        <>
        <header className='header shadow container-fluid' style={{ zIndex:'1000'}}>
      
            <div style={{display:'inline-block', float: 'left', marginLeft:'6%'}}>
               <div ><img className='image' style={{float: 'left', marginTop:'7px'}} src={process.env.PUBLIC_URL + '/logo-crud.png'} />
               <h1 style={{ marginLeft:'8px'}} > My CRUD</h1></div>
            </div>
            <nav style={{marginRight:'6%',display:'inline-block',}}>
                <ul>
                    <li ><a href='#'><FaBars className='header-icon'/></a></li>
                </ul>
            </nav>
     
      </header>
      <div className='container-fluid' style={{height:'15em', background:'linear-gradient(-45deg, rgba(1,10,60,1) 30%, rgba(19,82,115,1) 70%)',    flexDirection: 'column', display: 'flex'}}></div>
      </>
    )
}

export default Header
