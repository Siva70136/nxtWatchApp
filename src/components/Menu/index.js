import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {FaGamepad} from 'react-icons/fa'
import ThemeContext from '../../context/ThemeContext'
import {
  NavItemContainer,
  Item,
  Caption,
  MainContainer,
  LinkContainer,
  ImageContainer,
  ImgIcon,
} from './styledComponents'
import './index.css'

const Menu = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeActiveTab, activeTab} = value
      const className = isDark ? 'dark' : 'light'

      const onChangeTab = event => {
        changeActiveTab(event.target.id)
      }

      return (
        <MainContainer isDark={isDark}>
          <LinkContainer>
            <Link
              to="/"
              className={`nav-link  ${className}`}
              onClick={onChangeTab}
            >
              <Item>
                <NavItemContainer>
                  <AiFillHome />
                  <Caption id="HOME" activeTab={activeTab}>
                    Home
                  </Caption>
                </NavItemContainer>
              </Item>
            </Link>
            <Link
              to="/trending"
              className={`nav-link active-tab ${className}`}
              onClick={onChangeTab}
            >
              <Item>
                <NavItemContainer>
                  <AiFillFire />
                  <Caption id="TREND"> Trending</Caption>
                </NavItemContainer>
              </Item>
            </Link>
            <Link
              to="/games"
              className={`nav-link active-tab ${className}`}
              onClick={onChangeTab}
            >
              <Item>
                <NavItemContainer>
                  <FaGamepad />
                  <Caption id="GAME"> Games</Caption>
                </NavItemContainer>
              </Item>
            </Link>
            <Link
              to="/save"
              className={`nav-link active-tab ${className}`}
              onClick={onChangeTab}
            >
              <Item>
                <NavItemContainer>
                  <AiFillHome />
                  <Caption id="SAVE"> Saved Videos</Caption>
                </NavItemContainer>
              </Item>
            </Link>
          </LinkContainer>
          <div>
            <h1>CONTACT US</h1>
            <ImageContainer>
              <ImgIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <ImgIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <ImgIcon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </ImageContainer>
            <Caption>ENJOY! NOW TO SEE YOUR CHANNELS TO SUGGESTIONS</Caption>
          </div>
        </MainContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default Menu
