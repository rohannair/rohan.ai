import * as React from 'react'
import styled from 'styled-components'
import _Link from 'next/link'
import Logo from './Logo'
import _Wrapper from './Wrapper'

const Container = styled.div``
const Wrapper = styled(_Wrapper)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding-top: 40px;
  padding-bottom: 40px;
`

const Nav = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 20px;
  margin-left: auto;
`

const Link = styled(_Link)`
  text-decoration: none;
`

const Header: React.FC = () => (
  <Container>
    <Wrapper>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      <Nav>
        {/* <Link href="/contact">
          <a>
            <div>Contact</div>
          </a>
        </Link>
        <Link href="/services">
          <a>
            <div>Services</div>
          </a>
        </Link>
        <Link href="/journal">
          <a>
            <div>Journal</div>
          </a>
        </Link> */}
      </Nav>
    </Wrapper>
  </Container>
)

export default Header
