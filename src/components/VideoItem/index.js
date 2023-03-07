import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Menu from '../Menu'
import VideoDetails from '../VideoDetails'
import ThemeContext from '../../context/ThemeContext'
import VideoItemContainer from './styledComponents'

import './index.css'

const apiConsonants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'LOADING',
  failure: 'FAILURE',
}

const lightImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
const darkImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

class VideoItem extends Component {
  state = {apiStatus: apiConsonants.initial, videoItem: []}

  componentDidMount() {
    this.getDetails()
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
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        const className = isDark ? 'dark-home' : 'light'

        const {videoItem} = this.state
        return (
          <div className={`video-item-details-container ${className}`}>
            <VideoDetails item={videoItem} key={videoItem.id} />
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  getDetails = async () => {
    this.setState({
      apiStatus: apiConsonants.isLoading,
    })
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const each = data.video_details

      const updatedData = {
        description: each.description,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        videoUrl: each.video_url,
        viewCount: each.view_count,

        id: each.id,
        channel: each.channel,
        title: each.title,
      }

      console.log(updatedData)

      this.setState({
        videoItem: updatedData,
        apiStatus: apiConsonants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConsonants.failure,
      })
    }
  }

  renderItem = () => {
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
            <VideoItemContainer
              className={className}
              data-testid="videoItemDetails"
            >
              <Header />
              <div className="home-container">
                <div className="menu">
                  <Menu />
                </div>
                <div className="video-container">{this.renderItem()}</div>
              </div>
            </VideoItemContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItem
