import { renderHook } from "@testing-library/react";
import { useDebounce } from "../hooks/useDebounce";

test("should debounce value", async () => {
  const { result } = renderHook(() => useDebounce("test", 0));
  expect(result.current).toBe("test");
});
