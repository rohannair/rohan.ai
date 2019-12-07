import * as React from 'react'
import styled from 'styled-components'

import _Wrapper from './Wrapper'

const Container = styled.div`
  margin-top: auto;
  background-color: #333;
  color: #fff;
`
const Wrapper = styled(_Wrapper)`
  padding: 40px 0;
  font-family: 'Source Sans Pro', sans-serif;
`

const Footer: React.FC = () => (
  <Container>
    <Wrapper>&copy; 2019 Rohan Nair.</Wrapper>
  </Container>
)

export default Footer
