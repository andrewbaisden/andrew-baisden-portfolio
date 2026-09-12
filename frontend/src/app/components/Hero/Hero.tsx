import './Hero.css';
import { LondonRasterScene } from './scenes/london-raster-scene';

interface HeroProps {}

export const Hero = ({ ...props }: HeroProps) => {
  return (
    <div className="hero-artwork-wrap" {...props}>
      <LondonRasterScene />
    </div>
  );
};

export default Hero;
