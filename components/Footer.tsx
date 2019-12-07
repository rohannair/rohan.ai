import * as React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

import _Wrapper from './Wrapper'

const Container = styled.div`
  margin-top: auto;
  background-color: ${props => props.theme.colors.primaryFont};
  color: #fff;
`
const Wrapper = styled(_Wrapper)`
  display: flex;
  flex-direction: row;
  padding: 40px 0;
  font-family: 'Source Sans Pro', sans-serif;
`

const SocialIcon = styled.a.attrs({
  rel: 'noopener noreferrer',
  target: '_blank',
})`
  display: inline-block;
  height: 20px;
  width: 20px;
  cursor: pointer;

  &:link,
  &:visited {
    color: #fff;
  }
`

const SocialContainer = styled.div`
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

const Colophon = styled.div`
  font-size: 0.85rem;
`

const Footer: React.FC = () => (
  <Container>
    <Wrapper>
      <Colophon>&copy; 2019 Rohan Nair.</Colophon>
      <SocialContainer>
        <SocialIcon href="//linkedin.com/in/rohannair10">
          <FontAwesomeIcon icon={faLinkedin} />
        </SocialIcon>
        <SocialIcon href="//twitter.com/rohan10">
          <FontAwesomeIcon icon={faTwitter} />
        </SocialIcon>
        <SocialIcon href="//github.com/rohannair">
          <FontAwesomeIcon icon={faGithub} />
        </SocialIcon>
      </SocialContainer>
    </Wrapper>
  </Container>
)

export default Footer
