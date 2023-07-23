import { beforeEach, describe, expect, test } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetListQuery } from "./api";
import { wrapper } from "../test-utils";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("useGetListQuery", () => {
  const endpointName = "getList";
  const data = {};

  beforeEach(() => {
    fetchMock.mockOnceIf("http://localhost:8000/", () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify({ data }),
      })
    );
  });

  test("renders hook", async () => {
    const { result } = renderHook(() => useGetListQuery(), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchMock).toBeCalledTimes(1);

    expect(result.current).toMatchObject({
      status: "fulfilled",
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });
});
