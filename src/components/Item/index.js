import {Link} from 'react-router-dom'
import './index.css'

const Item = props => {
  const {item} = props
  const {title, thumbnailUrl, viewCount, channel, publishedAt, id} = item
  const updatedData = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = updatedData

  return (
    <div className="video-item">
      <Link to={`videos/${id}`} className="nav-link">
        <img src={thumbnailUrl} alt={title} className="thumbnail" />
      </Link>
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="profile-img" />
        <div className="data-container">
          <p className="title">{title}</p>
          <p className="name">{name}</p>
          <div className="count-container">
            <p className="view-count">{viewCount} views</p>
            <li>{publishedAt}</li>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
