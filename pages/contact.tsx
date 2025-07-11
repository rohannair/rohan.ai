import Layout from '../components/Layout'
import Head from 'next/head'
import { Button } from '../components/ui/button'

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <h1 className="text-4xl mb-4">Contact</h1>
      <p>Drop me an email at <a href="mailto:rn@rohan.ai" className="text-blue-400">rn@rohan.ai</a></p>
      <Button className="mt-4" onClick={() => (window.location.href = 'mailto:rn@rohan.ai')}>Email me</Button>
    </Layout>
  )
}
