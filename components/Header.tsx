import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Logo from './Logo'
import _Wrapper from './Wrapper'

const Container = styled.div``
const Wrapper = styled(_Wrapper)`
  padding: 40px 0;
`

const Header: React.FC = () => (
  <Container>
    <Wrapper>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </Wrapper>
  </Container>
)

export default Header
