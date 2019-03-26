import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { title } from "./_document";
import { ContextProvider } from "../components";
import { Provider as ThemeProvider } from "reakit";
import defaultTheme from "reakit-theme-default";
import App, { NextAppContext, DefaultAppIProps } from "next/app";

// Global CSS Styles
const GlobalStyle = createGlobalStyle`
  :root {
   --posterBgColor: #7DC9EC;
  }
  body, html {
    height: 100%;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({
    Component,
    ctx
  }: NextAppContext): Promise<DefaultAppIProps> {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <ContextProvider>
          <ThemeProvider theme={defaultTheme}>
            <Component {...pageProps} router={router} />
          </ThemeProvider>
          <GlobalStyle />
        </ContextProvider>
      </>
    );
  }
}
