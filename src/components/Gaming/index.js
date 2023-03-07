import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import GamingItem from '../GamingItem'
import Header from '../Header'
import Menu from '../Menu'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const lightImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

const darkImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

const apiConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'LOADING',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {apiStatus: apiConsonants.initial, trendingList: []}

  componentDidMount() {
    this.getTrendingDetails()
  }

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const imageUrl = isDark ? darkImage : lightImage
        const className = isDark ? 'dark' : 'light'

        return (
          <div className={`failure-container ${className}`}>
            <img src={imageUrl} alt="failure" className="failure-img" />
            <h1 className="">oops something went wrong</h1>
            <p>We have trouble</p>
            <button type="button">Retry</button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const className = isDark ? 'dark-home' : 'light'
        const {trendingList} = this.state
        return (
          <div className={`home-video-container ${className}`}>
            <div className="title-container">
              <div className="game-icon-container">
                <FaGamepad className="game-pad" />
              </div>

              <h1 className="title-name">Gaming</h1>
            </div>
            <div className="video-item-container">
              {trendingList.map(each => (
                <GamingItem item={each} key={each.id} />
              ))}
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  getTrendingDetails = async () => {
    this.setState({
      apiStatus: apiConsonants.isLoading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiConsonants.success,
        trendingList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiConsonants.failure,
      })
    }
  }

  renderItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConsonants.success:
        return this.renderSuccessView()
      case apiConsonants.failure:
        return this.renderFailureView()
      case apiConsonants.isLoading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          const className = isDark ? 'dark' : 'light'
          return (
            <div className={`home-app-container ${className}`}>
              <Header />
              <div className="home-container">
                <div className="menu">
                  <Menu />
                </div>
                <div className="video-container">{this.renderItems()}</div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
