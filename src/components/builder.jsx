"use client";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";
import "../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export function RenderBuilderContent({ content }) {
  const isPreviewing = useIsPreviewing();
  if (content || isPreviewing) {
    return <BuilderComponent content={content} model="page" />;
  }
  return <DefaultErrorPage statusCode={404} />;
}
