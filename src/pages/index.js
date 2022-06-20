import Head from "next/head";
import { MainLayout } from "../components/main-layout";
import { HomeHero } from "../components/home/home-hero";

const Home = () => {
  return (
    <>
      <Head>
        <title>Landing Page</title>
      </Head>
      <main>
        <HomeHero />
      </main>
    </>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Home;
