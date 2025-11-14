import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Every tutorial is designed to walk you through each step with total 
        clarity—making complex IT topics accessible, even for true beginners. 
        We build from the ground up and assume nothing, ensuring anyone can 
        follow along and succeed, regardless of prior experience. Our guides 
        are recognized for being some of the easiest to follow on the internet.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        We focus exclusively on the essentials—empowering you through hands-on, 
        practical IT lessons. Instead of endless slides or abstract theory, 
        our videos immerse you in actual projects and real-world problem solving,
        giving you experience you can use in your career or homelab right away.
      </>
    ),
  },
  {
    title: 'Powered by the Community',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn To HomeLab is grounded in open source values and genuine community 
        collaboration. Our content, business direction, and resources evolve 
        based on the input and sweat equity of our viewers and members. Decisions
        are shaped by your feedback, ensuring our tutorials and projects always 
        serve the needs of the IT and homelab community.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
