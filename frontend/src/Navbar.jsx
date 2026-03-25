import { Link } from "react-router-dom"
import './styles/navbar.css';

export default function Navbar(){
  return(

    <>
    <nav className="navbar">
      <ul>
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/trending">TRENDING</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        <li><Link to="/login">SIGN OUT</Link></li>
        <li><Link to="/cart">𖠩</Link></li>
        
      </ul>
    </nav>
    </>
    
  )
}