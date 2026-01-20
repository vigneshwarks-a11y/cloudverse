import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    let message = res.statusText || "Request failed";

    if (contentType.includes("application/json")) {
      try {
        const data = await res.json();
        const dataMessage =
          typeof (data as { message?: unknown }).message === "string"
            ? (data as { message: string }).message
            : typeof (data as { error?: unknown }).error === "string"
              ? (data as { error: string }).error
              : "";

        if (dataMessage) {
          message = dataMessage;
        } else if (data) {
          message = JSON.stringify(data);
        }
      } catch {
        // Keep fallback message when JSON parsing fails.
      }
    } else {
      const text = (await res.text()) || "";
      if (text && !/<!doctype html|<html/i.test(text)) {
        message = text;
      }
    }

    if (!message) {
      message = res.statusText || "Request failed";
    }

    throw new Error(`${res.status}: ${message}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
