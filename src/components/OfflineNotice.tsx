"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/** Red bar across the top of the screen while the visitor has no connection. */
export function OfflineNotice() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  if (!offline) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-0 top-0 z-[70] flex items-center justify-center gap-2.5 bg-error px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] text-center text-label-md text-white shadow-[0_8px_24px_rgba(186,26,26,0.35)]"
    >
      <Icon name="close" size={16} className="shrink-0" />
      <p>You&apos;re offline. Some things may not load until you&apos;re back online.</p>
    </div>
  );
}
