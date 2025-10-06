const flag = process.env.NEXT_PUBLIC_USE_MOCKS;

export const useMocks =
  flag === undefined || flag === "1" || flag?.toLowerCase() === "true";
