import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ComponentType, CSSProperties } from 'react';
import {
  BlackCab,
  CarOne,
  CarTwo,
  DeliveryVan,
  DoubleDeckerBus,
  TubeTrain,
  type VehicleProps,
} from '../../components/Hero/vehicles';
import londonDay from '../../img/london-day-master.webp';
import styles from './vehicle-assets-preview.module.css';

type PreviewAsset = {
  name: string;
  width: number;
  Component: ComponentType<VehicleProps>;
};

const roadVehicles: PreviewAsset[] = [
  { name: 'Double-decker bus', width: 420, Component: DoubleDeckerBus },
  { name: 'Black cab', width: 240, Component: BlackCab },
  { name: 'Compact car', width: 210, Component: CarOne },
  { name: 'Estate car', width: 225, Component: CarTwo },
  { name: 'Delivery van', width: 250, Component: DeliveryVan },
];

const scales = [
  { label: '0.5×', value: 0.5 },
  { label: '1×', value: 1 },
  { label: '2×', value: 2 },
];

export default function VehicleAssetsPreview() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <main className={styles.preview}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Development-only visual QA</p>
        <h1>London vehicle assets</h1>
        <p>
          Static SVG assets only. Lights, wheels, doors and movement are
          intentionally inactive.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Scale and silhouette</h2>
        <div className={styles.scaleGrid}>
          {scales.map((scale) => (
            <article className={styles.scaleCard} key={scale.label}>
              <h3>{scale.label}</h3>
              <div className={styles.scaleStage}>
                <div
                  className={styles.scaleFleet}
                  style={{ '--preview-scale': scale.value } as CSSProperties}
                >
                  {roadVehicles.map(({ name, width, Component }) => (
                    <figure key={name}>
                      <Component />
                      <figcaption>{name}</figcaption>
                      <span style={{ width }} aria-hidden="true" />
                    </figure>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Light and dark surfaces</h2>
        <div className={styles.surfaceGrid}>
          <article className={`${styles.surface} ${styles.surfaceLight}`}>
            <h3>Light</h3>
            <DoubleDeckerBus />
            <BlackCab />
            <CarOne />
            <CarTwo />
            <DeliveryVan />
            <TubeTrain />
          </article>
          <article className={`${styles.surface} ${styles.surfaceDark}`}>
            <h3>Dark</h3>
            <DoubleDeckerBus theme="dark" />
            <BlackCab theme="dark" />
            <CarOne theme="dark" />
            <CarTwo theme="dark" />
            <DeliveryVan theme="dark" />
            <TubeTrain theme="dark" />
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2>London composition check</h2>
        <div className={styles.londonStage}>
          <Image
            src={londonDay}
            alt=""
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 1200px"
            className={styles.londonImage}
          />
          <DoubleDeckerBus
            className={`${styles.sceneVehicle} ${styles.sceneBus}`}
          />
          <BlackCab className={`${styles.sceneVehicle} ${styles.sceneCab}`} />
          <CarOne className={`${styles.sceneVehicle} ${styles.sceneCarOne}`} />
          <CarTwo className={`${styles.sceneVehicle} ${styles.sceneCarTwo}`} />
          <TubeTrain
            className={`${styles.sceneVehicle} ${styles.sceneTrain}`}
          />
        </div>
      </section>
    </main>
  );
}
