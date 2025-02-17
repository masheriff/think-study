import { AppProps } from 'next/app';
import { Roboto, Open_Sans, Lato, Montserrat } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '600'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={`${roboto.className} ${openSans.className} ${lato.className} ${montserrat.className}`}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;