import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color:${props => props.isDark}?'#181818':'#f9f9f9'
  padding: 10px;
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
`

export const Caption = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`
export const ImageContainer = styled.div`
  display: flex;
`
export const ImgIcon = styled.img`
  width: 40px;
  height: 40px;
  margin: 5px;
`
