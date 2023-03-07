import styled from 'styled-components'

const TrendingContainer = styled.div`
 background-color:${props => props.className === 'dark'}?#0f0f0f:#f9f9f9
 color:${props => props.className === 'dark'}?#f9f9f9:#0f0f0f
`

export default TrendingContainer
