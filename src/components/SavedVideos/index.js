import {Component} from 'react'
import {AiFillFire} from 'react-icons/ai'
import Header from '../Header'
import Menu from '../Menu'
import SavedItem from '../SavedItem'
import ThemeContext from '../../context/ThemeContext'
import {SavedContainer, SavedVideosContainer} from './styleComponents'

class SavedVideos extends Component {
  renderVideoItems = () => (
    <ThemeContext.Consumer>
      {value => {
        const {savedVideos} = value

        return (
          <SavedVideosContainer data-testid="savedVideo">
            <div className="title-container">
              <div className="game-icon-container">
                <AiFillFire className="game-pad" />
              </div>

              <h1 className="title-name">Saved Videos</h1>
            </div>

            <ul className="saved-video-list-container">
              {savedVideos.map(each => (
                <SavedItem item={each} key={each.id} />
              ))}
            </ul>
          </SavedVideosContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderNoVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        const className = isDark ? 'dark' : 'light'

        return (
          <div className={`failure-container ${className}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
              alt="no saved videos"
              className="failure-img"
            />
            <h1 className="">No saved videos found</h1>
            <p>Save your videos by clicking a button</p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderItems = () => (
    <ThemeContext.Consumer>
      {value => {
        const {savedVideos} = value
        const len = savedVideos.length

        return (
          <>{len === 0 ? this.renderNoVideos() : this.renderVideoItems()}</>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const className1 = isDark ? 'dark-home' : 'light'
          const className = isDark ? 'dark' : 'light'
          return (
            <div className="video-container">
              <Header />

              <div className="home-container">
                <div className={`menu ${className1}`}>
                  <Menu />
                </div>
                <SavedContainer className={className} data-textid="savedVideos">
                  {this.renderItems()}
                </SavedContainer>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
