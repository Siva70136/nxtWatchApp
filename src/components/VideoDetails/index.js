import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddFill} from 'react-icons/ri'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const VideoDetails = props => (
  <ThemeContext.Consumer>
    {value => {
      const {saveVideosList, isDark} = value
      const className = isDark ? 'dark' : 'light'

      const {item} = props
      const {
        videoUrl,
        description,
        title,
        viewCount,
        publishedAt,
        channel,
      } = item
      const updatedData = {
        name: channel.name,
        profileImageUrl: channel.profile_image_url,
        subscriberCount: channel.subscriber_count,
      }
      const {name, profileImageUrl, subscriberCount} = updatedData

      const addVideo = () => {
        saveVideosList({...item})
      }

      return (
        <div className="video-details-item">
          <ReactPlayer
            className="react-player"
            url={videoUrl}
            width="100%"
            height="400px"
            controls
          />
          <p className="title-item">{title}</p>
          <div className="publish-container">
            <div className="count-container">
              <p className="view-count">{viewCount} views</p>
              <li>{publishedAt}</li>
            </div>
            <div className="icons-container">
              <div className="like-container">
                <AiOutlineLike className="icon-img" />
                <button
                  type="button"
                  className={`like ${className} button`}
                  id="LIKE"
                >
                  Like
                </button>
              </div>
              <div className="dis-like-container">
                <AiOutlineDislike className="icon-img" />
                <button
                  type="button"
                  className={`dis-like ${className} button`}
                >
                  Dislike
                </button>
              </div>
              <div className="save-container">
                <RiMenuAddFill className="icon-img" />
                <button
                  type="button"
                  className={`dis-like ${className} button`}
                  onClick={addVideo}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="profile-container">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="profile-img"
            />
            <div className="data-container">
              <p className="name">{name}</p>
              <p className="title">{subscriberCount} Subscribers</p>
              <p className="description">{description}</p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default VideoDetails
