import {Link} from 'react-router-dom'
import './index.css'

const Menu = () => (
  <div className="main-menu-container">
    <div className="menu-container">
      <Link to="/" className="nav-link active-tab">
        <li className="item">Home</li>
      </Link>
    </div>
  </div>
)

export default Menu
