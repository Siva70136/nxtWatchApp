import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color:${props => props.className === 'dark-home'}?#181818:#f9f9f9;
  color:${props => props.className === 'dark-home'}?#f9f9f9:#181818;
  padding: 10px;
  height:100vh;
`
export const LinkContainer = styled.div`
  padding: 10px;
`

export const Item = styled.li`
  list-style: none;
`
export const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  padding-left: 10px;
  padding-right: 10px;
  width: 150px;
  height: 40px;
`

export const Caption = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  background-color: ${props => props.id === props.activeTab}?#2563eb: #64748b;
`
export const ImageContainer = styled.div`
  display: flex;
`
export const ImgIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 5px;
`
