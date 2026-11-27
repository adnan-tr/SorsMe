import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { getSlot, loadOverrides, saveOverrides, type ImageOverride } from '@/lib/site-images';

type SiteImagesContextValue = {
  overrides: Record<string, ImageOverride>;
  setOverride: (slotId: string, value: ImageOverride) => boolean;
  resetSlot: (slotId: string) => void;
  resetAll: () => void;
};

const SiteImagesContext = createContext<SiteImagesContextValue | null>(null);

export function SiteImagesProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, ImageOverride>>({});
  const ref = useRef<Record<string, ImageOverride>>({});

  useEffect(() => {
    const stored = loadOverrides();
    ref.current = stored;
    setOverrides(stored);
  }, []);

  const setOverride = useCallback((slotId: string, value: ImageOverride) => {
    const next = { ...ref.current, [slotId]: value };
    const ok = saveOverrides(next);
    if (ok) {
      ref.current = next;
      setOverrides(next);
    }
    return ok;
  }, []);

  const resetSlot = useCallback((slotId: string) => {
    if (!(slotId in ref.current)) return;
    const next = { ...ref.current };
    delete next[slotId];
    saveOverrides(next);
    ref.current = next;
    setOverrides(next);
  }, []);

  const resetAll = useCallback(() => {
    saveOverrides({});
    ref.current = {};
    setOverrides({});
  }, []);

  const value = useMemo(() => ({ overrides, setOverride, resetSlot, resetAll }), [overrides, setOverride, resetSlot, resetAll]);

  return <SiteImagesContext.Provider value={value}>{children}</SiteImagesContext.Provider>;
}

function useSiteImagesContext(): SiteImagesContextValue {
  const ctx = useContext(SiteImagesContext);
  if (!ctx) throw new Error('Site image hooks must be used within SiteImagesProvider');
  return ctx;
}

export function useSiteImage(slotId: string): {
  src: string;
  style: CSSProperties;
  isCustom: boolean;
  override: ImageOverride | undefined;
  setOverride: (value: ImageOverride) => boolean;
  reset: () => void;
} {
  const { overrides, setOverride, resetSlot } = useSiteImagesContext();
  const slot = getSlot(slotId);
  const override = overrides[slotId];

  const src = override?.src ?? slot?.defaultSrc ?? '';
  const x = override?.x ?? slot?.defaultX ?? 50;
  const y = override?.y ?? slot?.defaultY ?? 50;
  const zoom = override?.zoom ?? 1;

  const style = useMemo<CSSProperties>(() => {
    if (!override) return {};
    return {
      objectPosition: `${x}% ${y}%`,
      scale: zoom !== 1 ? String(zoom) : undefined,
      transformOrigin: `${x}% ${y}%`,
    };
  }, [override, x, y, zoom]);

  const set = useCallback((value: ImageOverride) => setOverride(slotId, value), [setOverride, slotId]);
  const reset = useCallback(() => resetSlot(slotId), [resetSlot, slotId]);

  return { src, style, isCustom: Boolean(override), override, setOverride: set, reset };
}

type SiteImageProps = {
  slotId: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
};

/**
 * Renders a fixed-size clipping frame. The slot's layout class goes on the
 * wrapper, so zoom/position changes can never alter the page structure.
 */
export function SiteImage({ slotId, alt, className, loading, fetchPriority }: SiteImageProps) {
  const { src, style } = useSiteImage(slotId);
  return (
    <span className={className ? `media-frame ${className}` : 'media-frame'}>
      <img src={src} alt={alt} loading={loading} fetchPriority={fetchPriority} style={style} />
    </span>
  );
}
