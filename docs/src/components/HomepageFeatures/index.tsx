import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'For Contract Developers',
    image: require('@site/static/img/puppet_icon.svg'),
    description: (
      <>
        Learn how to interact with props and leverage their capabilities in your smart contracts.
      </>
    ),
  },
  {
    title: 'For Integrators',
    image: require('@site/static/img/puppet_icon.svg'),
    description: (
      <>
        Integrating with props off-chain? Get started here!
      </>
    ),
  },
  {
    title: 'As a Framework',
    image: require('@site/static/img/puppet_icon.svg'),
    description: (
      <>
        Use the props project as a development framework to kickstart your application development experience on Neo N3!
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={useBaseUrl('/img/puppet_icon.svg')} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
