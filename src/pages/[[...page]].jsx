import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import Head from "next/head";

builder.init("a777b51152364070a137f5646109462b");

export const getStaticProps = async ({ params }) => {
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath:
          "/" + (Array.isArray(params?.page) ? params.page.join("/") : ""),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
};

export async function getStaticPaths() {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  return {
    paths: pages
      .map((page) => `${page.data?.url}`)
      .filter((url) => url !== "/"),
    fallback: "blocking",
  };
}

export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page && page.data && page.data.title}</title>
        {console.log("page", page)}
        <>test</>
      </Head>
      <BuilderComponent model="page" content={page || undefined} />
    </>
  );
}
