// Server Component wrapper — exports generateStaticParams
import ThePropertyClient from './ThePropertyClient';

export async function generateStaticParams() {
  return [{ locale: 'he' }, { locale: 'en' }];
}

export default function ThePropertyPage({ params }: { params: { locale: string } }) {
  return <ThePropertyClient locale={params.locale} />;
}
