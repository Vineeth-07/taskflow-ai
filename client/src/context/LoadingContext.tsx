import { LoaderCircle } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import api from "../services/api";

type LoadingProviderProps = {
  children: ReactNode;
};

function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex min-w-56 flex-col items-center gap-3 rounded-lg bg-white px-6 py-5 text-slate-800 shadow-xl">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [pendingRequests, setPendingRequests] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        setPendingRequests((count) => count + 1);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        setPendingRequests((count) => Math.max(0, count - 1));
        return response;
      },
      (error) => {
        setPendingRequests((count) => Math.max(0, count - 1));
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    if (pendingRequests === 0) {
      setShowLoader(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowLoader(true);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pendingRequests]);

  return (
    <>
      {children}
      {showLoader && <LoadingScreen />}
    </>
  );
}
