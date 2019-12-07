import React, { FC } from 'react'
import { Heading } from 'styled-typography'
import styled from 'styled-components'

const Title = styled(Heading)`
  text-decoration: none;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  line-height: 1;
`

const Logo: FC = () => <Title>Rohan Nair</Title>

export default Logo
