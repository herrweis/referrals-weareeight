import Hero from '@/components/Hero/Hero';
import IntroText from '@/components/IntroText/IntroText';
import Steps from '@/components/Steps/Steps';
import WhoToRefer from '@/components/WhoToRefer/WhoToRefer';
import MathsTable from '@/components/MathsTable/MathsTable';
import Templates from '@/components/Templates/Templates';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroText />
      <Steps />
      <WhoToRefer />
      <MathsTable />
      <Templates />
      <FAQ />
      <Footer />
    </main>
  );
}
