import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import GamingItem from '../GamingItem'
import Header from '../Header'
import Menu from '../Menu'
import ThemeContext from '../../context/ThemeContext'
import GamingContainer from './styledComponents'

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

        return (
          <div className="failure-container">
            <img src={imageUrl} alt="failure view" className="failure-img" />
            <h1 className="">Oops! Something Went Wrong</h1>
            <p>We are having some trouble</p>
            <button
              type="button"
              onClick={this.getTrendingDetails}
              className="retry-button button"
            >
              Retry
            </button>
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

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <div className="home-video-container">
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
  }

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
          const className1 = isDark ? 'dark-home' : 'light'
          const className = isDark ? 'dark' : 'light'
          return (
            <GamingContainer className={className} data-testid="gaming">
              <Header />
              <div className="home-container">
                <div className={`menu ${className1}`}>
                  <Menu />
                </div>
                <div className="game-container">{this.renderItems()}</div>
              </div>
            </GamingContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
