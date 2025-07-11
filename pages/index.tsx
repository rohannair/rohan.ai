import Layout from '../components/Layout'
import Head from 'next/head'

export default function Home() {
  const experienceYears = new Date().getFullYear() - 2010
  return (
    <Layout>
      <Head>
        <title>Rohan Nair</title>
        <meta
          name="description"
          content="Rohan Nair is a Toronto based entrepreneur, fractional CTO, technology leader, and consultant."
        />
      </Head>
      <h1 className="text-4xl antialiased">Hi, I'm Rohan</h1>
      <p className="text-lg leading-8">
        I've spent over {experienceYears} years in the Toronto technology and startup ecosystem working at and founding multiple startups.
      </p>
      <p className="text-lg leading-8">
        I'm currently helping investors and small-business owners understand how to fit AI products into their business. I also sparingly invest in, and advise early stage software companies.
      </p>
      <h2>Core Interests</h2>
      <ul>
        <li className="text-lg leading-8 mb-4">
          <strong className="text-blue-500">Personal AI Agents</strong>, specifically experimenting with LLM technologies such as RAG to build myself an LLM that acts as a true daily assistant.
        </li>
        <li className="text-lg leading-8 mb-4">
          <strong className="text-green-400">AI-driven operations</strong>, specifically around building a new class of small-businesses that leverage AI services to drive growth.
        </li>
        <li className="text-lg leading-8 mb-4">
          <strong className="text-yellow-400">Society</strong>, specifically around solving real human problems like climate change, becoming a multi-planetary species, and educating our massively growing populations.
        </li>
        <li className="text-lg leading-8 mb-4">
          <strong className="text-red-500">Sports</strong>; I am a fan of the Toronto Raptors, Toronto Blue Jays, New England Patriots, FC Barcelona. I am 100% not a Leafs fan, and am embarrassed for my friends who were born into Leafs fandom.
        </li>
      </ul>
    </Layout>
  )
}
