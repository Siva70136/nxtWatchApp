import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const lightImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeTheme} = value
      const imageUrl = isDark ? darkImage : lightImage
      const className = isDark ? 'dark' : 'light'
      const icon = isDark ? (
        <FiSun className="icon-sun" />
      ) : (
        <FaMoon className="icon" />
      )
      const onCall = () => {
        changeTheme()
      }

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className={`header-container ${className}`}>
          <div className="inner-container">
            <div className="logo-container">
              <Link to="/">
                <img src={imageUrl} className="logo" alt="website logo" />
              </Link>
            </div>
            <div className="nav-items">
              <button
                type="button"
                className="button icon-button"
                onClick={onCall}
                data-testid="theme"
              >
                {icon}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-img"
              />
              <Popup
                modal
                trigger={
                  <button type="button" className="trigger-button button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <>
                    <div className="confirmation">
                      <button
                        type="button"
                        className="button cross"
                        onClick={() => close()}
                        data-testid="close"
                      >
                        <AiOutlineClose />
                      </button>
                      <p className="">Are you sure, you want to logout</p>
                      <div className="button-container">
                        <button
                          type="button"
                          className="cancel-button button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button button"
                          onClick={onLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </Popup>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
