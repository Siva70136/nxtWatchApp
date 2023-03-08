import styled from 'styled-components'

export const SavedContainer = styled.div`
 background-color:${props => props.className === 'dark'}?#0f0f0f:#f9f9f9
 color:${props => props.className === 'dark'}?#f9f9f9:#0f0f0f
 width: 1100px;
 @media screen and (max-width: 576px) {
    width: 100%;
  }
`
export const SavedVideosContainer = styled.div`
  width: 1000px;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`
