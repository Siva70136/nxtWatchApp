import Header from '../Header'
import Menu from '../Menu'

import ThemeContext from '../../context/ThemeContext'

const lightImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
const darkImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const imageUrl = isDark ? lightImage : darkImage
      const className = isDark ? 'dark' : 'light'
      const className1 = isDark ? 'dark-home' : 'light'
      return (
        <div className={`home-app-container ${className}`}>
          <Header />
          <div className="home-container">
            <div className="menu">
              <Menu />
            </div>
            <div className={`video-container ${className1}`}>
              <div className={`failure-container `}>
                <img src={imageUrl} className="failure-img" alt="not found" />
                <h1 className="">Page Not Found</h1>
                <p>we are sorry, the page you requested could not be found.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
