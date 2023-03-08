import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
import TrendingItem from '../TrendingItem'
import Header from '../Header'
import Menu from '../Menu'
import ThemeContext from '../../context/ThemeContext'
import TrendingContainer from './styleComponents'

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

class Trending extends Component {
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
          <div
            className={`failure-container ${className}`}
            data-testid="trending"
          >
            <img src={imageUrl} alt="failure view" className="failure-img" />
            <h1 className="">Oops! Something Went Wrong</h1>
            <p>We are having some trouble</p>
            <button type="button" onClick={this.getTrendingDetails}>
              Retry
            </button>
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

  renderSuccessView = () => {
    const {trendingList} = this.state
    return (
      <div className="home-video-container">
        <div className="title-container">
          <div className="game-icon-container">
            <AiFillFire className="game-pad" />
          </div>

          <h1 className="title-name">Trending</h1>
        </div>

        <ul className="video-item-container">
          {trendingList.map(each => (
            <TrendingItem item={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  getTrendingDetails = async () => {
    this.setState({apiStatus: apiConsonants.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.videos.map(each => ({
        channel: each.channel,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))

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
            <TrendingContainer className={className} data-textid="trending">
              <Header />
              <div className="home-container">
                <div className={`menu ${className1}`}>
                  <Menu />
                </div>
                <div className="video-container">{this.renderItems()}</div>
              </div>
            </TrendingContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
