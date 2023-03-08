import styled from 'styled-components'

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: black;
  height: 300px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100%;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`

export const HomeAppContainer = styled.div`
 background-color:${props => props.className === 'dark'}?#181818:#f9f9f9
 color:${props => props.className === 'dark'}?#f9f9f9:#181818
`
