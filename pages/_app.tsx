import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme, darkTheme } from '../themes';
import { UIProvider } from '../context/ui';
import Entriesprovider from '../context/entries/EntriesProvider';




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      
      <Entriesprovider>

        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>

      </Entriesprovider>

    </UIProvider>
  )
}

export default MyApp
