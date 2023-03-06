import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import './index.css'

const VideoDetails = props => {
  const {item} = props
  const {videoUrl, description, title, viewCount, publishedAt, channel} = item
  const updatedData = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
    subscriberCount: channel.subscriber_count,
  }
  const {name, profileImageUrl, subscriberCount} = updatedData

  return (
    <div className="video-details-item">
      <ReactPlayer url={videoUrl} controls="true" width="100%" height="450px" />
      <p className="title-item">{title}</p>
      <div className="like-container">
        <div className="count-container">
          <p className="view-count">{viewCount} views</p>
          <li>{publishedAt}</li>
        </div>
        <div className="icons-container">
          <AiOutlineLike className="icon-img" />
          <AiOutlineDislike className="icon-img" />
        </div>
      </div>
      <hr className="line" />
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="profile-img" />
        <div className="data-container">
          <p className="name">{name}</p>
          <p className="title">{subscriberCount} Subscribers</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails
