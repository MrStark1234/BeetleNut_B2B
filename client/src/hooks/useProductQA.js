import { useCallback, useRef, useState } from "react";

export function useProductQA({ baseUrl = "" } = {}) {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const ask = useCallback(
    async ({ productId, question }) => {
      if (!productId || !question?.trim()) return;
      setLoading(true);
      setError("");
      setAnswer("");
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(`${baseUrl}/api/ai/product-qa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, question }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          const msg = data?.error || `Request failed (${res.status})`;
          setError(msg);
          return;
        }
        setAnswer(data?.answer || "");
      } catch (e) {
        if (e.name !== "AbortError")
          setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  const reset = useCallback(() => {
    setAnswer("");
    setError("");
  }, []);

  return { loading, answer, error, ask, reset };
}
