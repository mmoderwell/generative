import Head from 'next/head';
import { useEffect, useRef } from 'react';

import styles from '../styles/Index.module.scss';

export default function Home() {

  const sketchRef = useRef(null);

  useEffect(() => {
    const p5 = require("p5");

    const s = (sketch) => {
      let x = 100;
      let y = 100;
      const totalPts = 600;
      const steps = totalPts + 1;

      sketch.setup = () => {
        const sketchWidth = 600;
        const sketchHeight = 600;
        sketch.createCanvas(sketchWidth, sketchWidth).parent(sketchRef.current);
        sketch.stroke(0);
        sketch.frameRate(30);
      };
      sketch.windowResized = () => {
        // sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight)
        const sketchWidth = sketchRef.current.offsetWidth;
        const sketchHeight = sketchRef.current.offsetHeight;
        sketch.resizeCanvas(sketchWidth, sketchHeight);
      }
      sketch.draw = () => {
        // sketch.background(0);
        // sketch.fill(255);
        // sketch.rect(x, y, 50, 50);
        sketch.background(255);
        let rand = 0;
        for (let i = 1; i < steps; i++) {
          sketch.point((sketch.width / steps) * i, sketch.height / 2 + sketch.random(-rand, rand));
          rand += sketch.random(-5, 5);
        }
      };
    };

    const canvas = new p5(s);
    // clean up on hot-reload and refresh
    return () => canvas.remove();
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Physics</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sketch} ref={sketchRef}></div>
      </main>
    </div>
  )
}
