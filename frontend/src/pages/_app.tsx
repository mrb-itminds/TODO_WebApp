import "../styles.global.css";
import "isomorphic-unfetch";

import { ChakraProvider } from "@chakra-ui/react";
import { usePWA } from "hooks/usePWA";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import { I18nProvider } from "next-rosetta";
import { ReactElement, useEffect } from "react";
import EnvSettings from "types/EnvSettings";
import isomorphicEnvSettings, { setEnvSettings } from "utils/envSettings";
import { logger } from "utils/logger";

import theme from "../theme/theme";

type Props = {
  envSettings: EnvSettings;
};

const MyApp = ({ Component, pageProps, __N_SSG }: AppPropsType & Props): ReactElement => {
  usePWA();

  useEffect(() => {
    if (!__N_SSG) {
      logger.info("Environment should be readable");

      const envSettings = isomorphicEnvSettings();
      if (envSettings) setEnvSettings(envSettings);
      if (process.browser) {
        fetch("/api/getEnv")
          .then(res => {
            if (res.ok) return res.json();
            throw res.statusText;
          })
          .then(
            envSettings => setEnvSettings(envSettings),
            e => {
              logger.debug("env error", e);
            }
          );
      }
    }
  }, []);

  return (
    <main>
      <Head>
        <title>APPNAMEHERE</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2196f3" />
        <meta name="description" content="APPNAMEHERE" />
        <meta name="robots" content="noindex" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png"></link>
      </Head>
      <noscript>
        <h1>JavaScript must be enabled!</h1>
      </noscript>
      <I18nProvider table={pageProps.table}>
        <ChakraProvider theme={theme}>
          {/* <SignalRContext.Provider value={{ connection }}> */}
          <Component {...pageProps} />
          {/* </SignalRContext.Provider> */}
        </ChakraProvider>
      </I18nProvider>
    </main>
  );
};

export default MyApp;
