import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {
  NavItemContainer,
  Item,
  Caption,
  MainContainer,
} from './styledComponents'
import './index.css'

const Menu = () => (
  <>
    <MainContainer>
      <Link to="/" className="nav-link active-tab">
        <Item>
          <NavItemContainer>
            <AiFillHome />
            <Caption className=""> Home</Caption>
          </NavItemContainer>
        </Item>
      </Link>
      <Link to="/trending" className="nav-link active-tab">
        <Item>
          <NavItemContainer>
            <AiFillFire />
            <Caption className=""> Trending</Caption>
          </NavItemContainer>
        </Item>
      </Link>
      <Link to="/games" className="nav-link active-tab">
        <Item>
          <NavItemContainer>
            <AiFillHome />
            <Caption className=""> Games</Caption>
          </NavItemContainer>
        </Item>
      </Link>
      <Link to="/save" className="nav-link active-tab">
        <Item>
          <NavItemContainer>
            <AiFillHome />
            <Caption className=""> Saved Videos</Caption>
          </NavItemContainer>
        </Item>
      </Link>
    </MainContainer>
  </>
)

export default Menu
