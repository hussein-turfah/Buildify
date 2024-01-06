"use client";
import { Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Page from "./pages/[[...page]]";

Builder.registerComponent(Counter, {
  name: "Counter",
});

Builder.registerComponent(Page, {
  name: "Page",
});
