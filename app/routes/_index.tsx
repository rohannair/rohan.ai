export const meta = [
  {
    title: 'Rohan Nair',
  },
  {
    description:
      'Rohan Nair is a Toronto based entrepreneur, technology leader, and consultant.',
  },
]

export default function Index() {
  return (
    <>
      <h1 className="prose text-4xl antialiased">Hi, I'm Rohan</h1>
      <p className="prose text-lg leading-8">
        I'm currently the VP of Technology at{' '}
        <a
          href="//nauticalcommerce.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nautical Commerce
        </a>
        , sometimes consulting through{' '}
        <a href="//chaiventures.io" target="_blank" rel="noopener noreferrer">
          Chai Ventures
        </a>
        , and sometimes angel investing. Commerce and Fintech are my
        professional specialities; specifically around utilizing cutting edge
        technologies to build the future of marketplaces, and financial
        services.
      </p>
      <p className="prose text-lg leading-8">
        Prior to this, I've spent over {new Date().getFullYear() - 2010} years
        in the Toronto technology and startup ecosystem in various roles and
        companies including leading Technology at{' '}
        <a href="//highlinebeta.com" target="_blank" rel="noopener noreferrer">
          VC fund Highline Beta
        </a>
        ; founding multiple startups; and having been on the early teams of{' '}
        <a
          href="https://betakit.com/semantic-health-comes-out-of-stealth-to-help-hospitals-use-coded-data/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Semantic Health
        </a>{' '}
        (acq. 2023),{' '}
        <a
          href="https://betakit.com/toronto-fintech-startup-pungle-acquired-by-berkeley-payment-solutions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pungle Payments
        </a>{' '}
        (acq. 2019),{' '}
        <a
          href="https://betakit.com/ebay-acquiring-terapeak-to-boost-its-data-analytics-offering-for-sellers/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terapeak
        </a>{' '}
        (acq. 2017), and{' '}
        <a
          href="https://betakit.com/well-ca-acquired-by-mckesson-canada/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Well.ca
        </a>{' '}
        (acq. 2017).
      </p>
      <h2 className="prose antialiased">Core Interests</h2>
      <ul>
        <li className="prose text-lg leading-8 mb-4">
          <strong className="text-blue-500">Fintech</strong>, specifically
          around how we can build new robust protocols that help all humans
          build wealth, and participate in the growth of our global economy.
        </li>
        <li className="prose text-lg leading-8 mb-4">
          <strong className="text-green-400">Machine Learning/AI</strong>,
          specifically around solving human problems with the harnessed power of
          tons of overpriced GPUs.
        </li>
        <li className="prose text-lg leading-8 mb-4">
          <strong className="text-yellow-400">Society</strong>, specifically
          around solving real human problems like climate change, becoming a
          multi-planetary species, and educating our massively growing
          populations.
        </li>
        <li className="prosetext-base prose text-lg leading-8 mb-4">
          <strong className="text-red-500">Sports</strong>; I am a fan of the
          Toronto Raptors, Toronto Blue Jays, New England Patriots, FC
          Barcelona. I am 100% not a Leafs fan, and am embarrassed for my
          friends who were born into Leafs fandom.
        </li>
      </ul>
    </>
  )
}
