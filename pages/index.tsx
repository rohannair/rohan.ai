import React from 'react'
import { Heading, Text } from 'styled-typography'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'

export default () => (
  <Layout>
    <Wrapper>
      <Heading level={2} lineHeight={1.45}>
        Hi, I'm Rohan
      </Heading>
      <Text>
        I'm a Technology leader, polyglot software developer, entrepreneur,
        sometimes speaker, and full time Toronto sports fan. My career has
        afforded me opportunities leading technology teams in high growth
        startups, venture capital, and as a founder.
      </Text>
    </Wrapper>
  </Layout>
)
