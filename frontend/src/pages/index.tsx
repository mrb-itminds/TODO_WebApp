import Demo from "components/Demo/Demo";
import Start from "components/Demo/StartPage";
import StartPage from "components/Demo/StartPage"
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";

const IndexPage: NextPage = () => {
  return <Start />;
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;

  const { table = {} } = await import(`../i18n/${locale}`);
  return { props: { table } };
};

export default IndexPage;
