import App from '@/src/App';

export const metadata = {
  title: 'Vape Street BD | Premier Vape Shop in Mirpur & Dhaka | Vape Price in BD',
  description: 'Welcome to Vape Street BD - Bangladesh premier luxury vape shop in Mirpur, Dhaka. Find authentic vape devices, e-liquids, salt nic, coils, pods & best vape price in Dhaka.',
  keywords: [
    'Vape Street BD',
    'vape shop in mirpur',
    'vape dhaka',
    'vape price in dhaka',
    'vape price in bangladesh',
    'mirpur vape store',
    'authentic e-liquids dhaka',
    'salt nic price bd',
    'caliburn g3 price bangladesh'
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Hidden SEO Keyword Container for Crawlers */}
      <section style={{ display: 'none' }} className="sr-only">
        <h1>Vape Street BD - Premier Vape Shop in Mirpur, Dhaka</h1>
        <h2>Best Vape Price in Dhaka & Authentic E-Liquid Store Bangladesh</h2>
        <p>
          Looking for the best vape shop in Mirpur, Dhaka? Vape Street BD is your trusted source for authentic vape devices, pod systems, coils, disposables, and premium international e-liquids at unbeatable vape prices in Dhaka and across Bangladesh. Visit our outlets in Mirpur 1 and Paikpara.
        </p>
      </section>

      <App />
    </>
  );
}
