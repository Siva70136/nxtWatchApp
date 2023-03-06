import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Menu from '../Menu'
import Item from '../Item'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const lightImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
const darkImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

const lightLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const apiConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiConsonants.initial, videoList: []}

  componentDidMount() {
    this.getInfo()
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

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const imageUrl = isDark ? darkLogo : lightLogo
        const className = isDark ? 'dark-home' : 'light'

        const {videoList} = this.state
        return (
          <div className={`home-video-container ${className}`}>
            <div className="banner-container">
              <div className="banner-data-container">
                <img src={imageUrl} alt="website logo" className="logo" />
                <h1 className="cap">Buy Nxt Watch</h1>
                <p>We have trouble</p>
                <button type="button">GET IT NOW</button>
              </div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
                className="banner"
                alt="Banner Background"
              />
            </div>
            <div className="video-item-container">
              {videoList.map(each => (
                <Item item={each} key={each.id} />
              ))}
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  getInfo = async () => {
    this.setState({
      apiStatus: apiConsonants.isLoading,
    })

    const url = 'https://apis.ccbp.in/videos/all?search='
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(each => ({
        channel: each.channel,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiConsonants.success,
        videoList: updatedData,
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

export default Home
