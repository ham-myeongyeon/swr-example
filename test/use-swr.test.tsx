import React, { useState } from "react";
import useSwr from "core/src/use-swr";
import { render, screen, cleanup } from "@testing-library/react";
import { sleep } from "./utils";

describe("useSwr test", () => {
  it("should be return data after loading", async () => {
    const createKey = () => "swr-key-" + ~~(Math.random() * 1e7);
    const fetcher = (_key: string): string => "res:" + _key;
    const key = createKey();

    function Page() {
      const { data } = useSwr(key, fetcher);
      return <div data-testid="result">{data}</div>;
    }

    render(<Page />);
    await sleep(10);
    cleanup();
    render(<Page />);
    const result = screen.getByTestId("result").textContent;

    expect(result).toBe(fetcher(key));
  });
});
