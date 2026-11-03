import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
};

vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: ImageProps) => {
    return <img src={typeof src === "string" ? src : src.src} alt={alt} {...rest} />;
  },
}));

afterEach(() => {
  cleanup();
  localStorage.clear();
  for (const key of Object.keys(document.documentElement.dataset)) {
    delete document.documentElement.dataset[key];
  }
  vi.restoreAllMocks();
  vi.useRealTimers();
});
