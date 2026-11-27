import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { Image as ImageIcon, RotateCcw, Upload, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTitle, Panel, Tag } from '@/components/admin/primitives';
import { useSiteImage } from '@/components/site-image';
import { imageSlots, resizeImageFile, type ImageSlot } from '@/lib/site-images';

export const Route = createFileRoute('/admin/media')({ component: MediaPage });

function MediaPage() {
  const groups = Array.from(new Set(imageSlots.map((s) => s.group)));
  const [notice, setNotice] = useState<string | null>(null);
  return (
    <>
      <PageTitle title="Site Images" subtitle="Replace the photos shown on the public website. Every slot keeps its exact display size — only the image inside changes." crumbs={['Media']} />
      <div className="admin-notice compact" role="status">
        <ImageIcon size={18} />
        <div>
          <strong>Saved in this browser</strong>
          <p>Image changes are stored locally (no backend connected yet), and appear on the public pages right away.</p>
        </div>
        <span className="admin-tag warning">Local preview</span>
      </div>
      {notice && <p className="admin-success" role="status">{notice}</p>}
      {groups.map((g) => (
        <Panel key={g} title={g}>
          <div className="media-grid">
            {imageSlots.filter((s) => s.group === g).map((slot) => (
              <MediaCard key={slot.id} slot={slot} onNotice={setNotice} />
            ))}
          </div>
        </Panel>
      ))}
    </>
  );
}

function MediaCard({ slot, onNotice }: { slot: ImageSlot; onNotice: (msg: string) => void }) {
  const { src, style, isCustom, override, setOverride, reset } = useSiteImage(slot.id);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const zoom = override?.zoom ?? 1;
  const x = override?.x ?? slot.defaultX;
  const y = override?.y ?? slot.defaultY;

  const apply = (patch: Partial<{ src: string; zoom: number; x: number; y: number }>) => {
    const next = {
      src: patch.src ?? override?.src ?? slot.defaultSrc,
      zoom: patch.zoom ?? zoom,
      x: patch.x ?? x,
      y: patch.y ?? y,
    };
    const ok = setOverride(next);
    if (!ok) setError('Storage is full — try a smaller image.');
    else setError(null);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const dataUrl = await resizeImageFile(file);
      apply({ src: dataUrl });
      onNotice(`“${slot.label}” updated. Open the public page to see it.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const previewScale = Math.min(1, 240 / slot.width);
  const pw = Math.round(slot.width * previewScale);
  const ph = Math.round(slot.height * previewScale);

  return (
    <div className={isCustom ? 'media-card is-custom' : 'media-card'}>
      <div className="media-preview" style={{ width: pw, height: ph }}>
        <img src={src} alt={slot.label} style={style} />
      </div>
      <div className="media-meta">
        <strong>{slot.label}</strong>
        <span className="media-size">{slot.width} × {slot.height} px · {slot.page}</span>
        {isCustom ? <Tag tone="success">Custom</Tag> : <Tag>Default</Tag>}
      </div>
      <div className="media-controls">
        <div className="media-zoom">
          <button type="button" className="admin-icon-btn" aria-label="Zoom out" onClick={() => apply({ zoom: Math.max(1, Math.round((zoom - 0.1) * 10) / 10) })}><ZoomOut size={15} /></button>
          <input type="range" min={1} max={3} step={0.05} value={zoom} aria-label={`Zoom for ${slot.label}`} onChange={(e) => apply({ zoom: Number(e.target.value) })} />
          <button type="button" className="admin-icon-btn" aria-label="Zoom in" onClick={() => apply({ zoom: Math.min(3, Math.round((zoom + 0.1) * 10) / 10) })}><ZoomIn size={15} /></button>
          <span className="media-zoom-value">{Math.round(zoom * 100)}%</span>
        </div>
        <label className="media-pos">Position X<input type="range" min={0} max={100} value={x} aria-label={`Horizontal position for ${slot.label}`} onChange={(e) => apply({ x: Number(e.target.value) })} /></label>
        <label className="media-pos">Position Y<input type="range" min={0} max={100} value={y} aria-label={`Vertical position for ${slot.label}`} onChange={(e) => apply({ y: Number(e.target.value) })} /></label>
        <div className="media-actions">
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
          <Button size="sm" variant="outline" disabled={busy} onClick={() => fileRef.current?.click()}><Upload size={14} />{busy ? 'Processing…' : 'Replace'}</Button>
          <Button size="sm" variant="ghost" disabled={!isCustom} onClick={() => { reset(); setError(null); }}><RotateCcw size={14} />Reset</Button>
        </div>
        {error && <p className="admin-error" role="alert">{error}</p>}
      </div>
    </div>
  );
}
