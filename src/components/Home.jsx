import Header from './Header';
import Hero from './Hero';
import Purpose from './Purpose';
import Stack from './Stack';
import IntegratedQuantumSystems from './Integratedquantumsystems';
import Roadmap from './Roadmap';
import NextEra from './NextEra';
import Footer from './Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Purpose />
      <Stack />
      {/* <IntegratedQuantumSystems /> */}
      <Roadmap />
      <NextEra />
      <Footer />
    </main>
  );
}