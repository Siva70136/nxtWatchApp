import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import Menu from '../Menu'
import Item from '../Item'
import {BannerContainer, HomeAppContainer} from './styledComponents'
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

class Home extends Component {
  state = {apiStatus: apiConsonants.initial, videoList: [], search: ''}

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
            <img src={imageUrl} alt="failure view" className="failure-img" />
            <h1 className="">Oops! Something Went Wrong</h1>
            <p>We are having some trouble</p>
            <button
              type="button"
              onClick={this.getInfo}
              className="retry-button button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  onSearch = event => {
    this.setState({
      search: event.target.value,
    })
  }

  renderVideoItems = () => {
    const {videoList} = this.state
    return (
      <div className="video-item-container">
        {videoList.map(each => (
          <Item item={each} key={each.id} />
        ))}
      </div>
    )
  }

  changeSearch = () => {
    this.setState(
      {
        search: '',
      },
      this.getInfo,
    )
  }

  renderNoVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value

        const className = isDark ? 'dark' : 'light'

        return (
          <div className={`failure-container ${className}`}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="failure-img"
            />
            <h1 className="">No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button
              type="button"
              onClick={this.changeSearch}
              className="retry-button button"
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderSuccessView = () => {
    const {videoList} = this.state
    const len = videoList.length

    return <>{len === 0 ? this.renderNoVideos() : this.renderVideoItems()}</>
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  getInfo = async () => {
    this.setState({
      apiStatus: apiConsonants.isLoading,
    })
    const {search} = this.state

    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
          const {search} = this.state
          const className = isDark ? 'dark' : 'light'
          const className1 = isDark ? 'dark-home' : 'light'
          return (
            <HomeAppContainer className={className} data-testid="home">
              <Header />
              <div className="home-container">
                <div className={`menu ${className1}`}>
                  <Menu />
                </div>
                <div className="video-container">
                  <div className={`home-video-container ${className}`}>
                    <BannerContainer data-testid="banner">
                      <div className="x">
                        <button
                          type="button"
                          className="button wrong"
                          data-testid="close"
                        >
                          <AiOutlineClose className="close" />
                        </button>
                      </div>
                      <div className="banner-data-container">
                        <Link to="/">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="nxt watch logo"
                            className="logo"
                          />
                        </Link>
                        <p className="cap">Buy Nxt Watch Premium</p>
                        <p>We have trouble</p>
                        <button
                          type="button"
                          className="get-button button"
                          data-testid="close"
                        >
                          GET IT NOW
                        </button>
                      </div>
                    </BannerContainer>
                    <div className="banner-video-container">
                      <div className="search-container">
                        <input
                          type="search"
                          placeholder="Search"
                          value={search}
                          className="search-box box"
                          onChange={this.onSearch}
                        />
                        <button
                          type="button"
                          data-testid="searchButton"
                          onClick={this.getInfo}
                          className="search-button"
                        >
                          <AiOutlineSearch
                            className={`search-icon ${className}`}
                          />
                        </button>
                      </div>
                      {this.renderItems()}
                    </div>
                  </div>
                </div>
              </div>
            </HomeAppContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
