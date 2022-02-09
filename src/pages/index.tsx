import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rohan Nair</title>
        <meta name="description" content="I don't care about SEO" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Home" />
        <meta property="og:description" content="Rohan Nair" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rohan.ai/" />
        <meta property="og:image" content="https://rohan.ai/avatar400.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rohan10" />
        <meta name="twitter:title" content="Rohan Nair" />
        <meta
          name="twitter:description"
          content="I’m an entrepreneur, and polyglot software developer currently building new ventures, and investing through Chai Ventures."
        />
        <meta name="twitter:image" content="https://rohan.ai/avatar400.png" />
        He
      </Head>
      <div className="w-full">
        <div className="prose lg:prose-xl m-auto mt-20 prose-invert">
          <h2>Hi, I&rsquo;m Rohan</h2>
          <p>
            I&rsquo;m an entrepreneur, currently building{" "}
            <a href="//jointcare.io" target="_blank" rel="noopener noreferrer">
              Jointcare
            </a>
            , and investing through{" "}
            <a
              href="//chaiventures.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chai Ventures
            </a>
            . My core focuses are Healthcare, and Fintech; specifically around
            building ML-driven applications.
          </p>
          <p>
            Prior to this, I&rsquo;ve spent over 11 years in the{" "}
            <a
              href="https://thecorridor.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Toronto-Waterloo
            </a>{" "}
            tech. ecosystem in various roles and companies including leading
            Technology at{" "}
            <a
              href="//highlinebeta.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              VC fund Highline Beta
            </a>
            ; founding multiple startups; and having been on the early teams of{" "}
            <a
              href="https://betakit.com/semantic-health-comes-out-of-stealth-to-help-hospitals-use-coded-data/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Semantic Health
            </a>
            ,{" "}
            <a
              href="https://betakit.com/toronto-fintech-startup-pungle-acquired-by-berkeley-payment-solutions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pungle Payments
            </a>{" "}
            (acq. 2019), Finaeo,{" "}
            <a
              href="https://betakit.com/ebay-acquiring-terapeak-to-boost-its-data-analytics-offering-for-sellers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terapeak
            </a>{" "}
            (acq. 2017), and{" "}
            <a
              href="https://betakit.com/well-ca-acquired-by-mckesson-canada/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Well.ca
            </a>{" "}
            (acq. 2017).
          </p>
          <h3>Core Interests</h3>
          <ul>
            <li>
              <strong className="text-blue-500">Healthcare</strong>,
              specifically around using Machine Learning to surmount barriers
              within health informatics and data modelling.
            </li>
            <li>
              <strong className="text-green-500">Fintech</strong>, specifically
              around how we can build new robust protocols that help all humans
              build wealth, and participate in the growth of our global economy.
            </li>
            <li>
              <strong className="text-yellow-400">Society</strong>, specifically
              around solving real human problems like climate change, becoming a
              multi-planetary species, and educating our massively growing
              populations.
            </li>
            <li>
              <strong className="text-red-500">Sports</strong>; I am a fan of
              the Toronto Raptors, Toronto Blue Jays, New England Patriots, FC
              Barcelona. I am 100% not a Leafs fan, and am embarrassed for my
              friends who were born into Leafs fandom.
            </li>
            <li>
              <strong className="text-orange-400">Gaming</strong>; I primarily
              play Call of Duty Warzone, Halo Infinite, Factorio, and open-world
              RPGs.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
