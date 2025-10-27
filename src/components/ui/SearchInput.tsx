'use client';

import { LucideSearch, LucideX } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from './input';

type Props = {
  defaultValue?: string;
  placeholder?: string;
  /** Optional base path to navigate to (e.g. '/articles'). If omitted we'll use the current pathname. */
  base?: string;
  /** If true, trigger navigation automatically while typing (debounced). Default: false */
  autoSearch?: boolean;
  /** Debounce delay in milliseconds used when autoSearch is enabled. Default: 300 */
  debounceMs?: number;
  /** Optional callback that receives the target URL instead of performing internal navigation. */
  onNavigate?: (url: string) => void;
};

export default function SearchInput({
  defaultValue = '',
  placeholder = 'Search...',
  base,
  autoSearch = false,
  debounceMs = 300,
  onNavigate,
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const timerRef = React.useRef<number | null>(null);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) params.set('q', value);
    else params.delete('q');
    params.set('page', '1');
    const defaultBase = '/articles';
    // keep backwards compatibility: if a base prop is passed, use it; otherwise use current pathname
    const basePath = (base ?? pathname ?? defaultBase) as string;
    const s = params.toString();
    const url = `${basePath}${s ? `?${s}` : ''}`;
    if (onNavigate) {
      onNavigate(url);
      return;
    }
    // manual submit should add a history entry
    router.push(url);
  };

  const clear = () => {
    setValue('');
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('q');
    params.set('page', '1');
    const defaultBase = '/articles';
    const basePath = (base ?? pathname ?? defaultBase) as string;
    const s = params.toString();
    const url = `${basePath}${s ? `?${s}` : ''}`;
    if (onNavigate) {
      onNavigate(url);
      return;
    }
    // clearing should add a history entry
    router.push(url);
  };

  // Auto-search: navigate after user stops typing for debounceMs
  React.useEffect(() => {
    if (!autoSearch) return;

    // clear existing timer
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // schedule navigation
    timerRef.current = window.setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (value) params.set('q', value);
      else params.delete('q');
      params.set('page', '1');
      const defaultBase = '/articles';
      const basePath = (base ?? pathname ?? defaultBase) as string;
      const s = params.toString();
      const url = `${basePath}${s ? `?${s}` : ''}`;
      if (onNavigate) {
        onNavigate(url);
      } else {
        // For live/debounced searches we replace the history entry to avoid filling back history
        router.replace(url);
      }
      timerRef.current = null;
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, autoSearch, debounceMs, base, pathname]);

  return (
    <form onSubmit={submit} className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          <LucideSearch size={16} />
        </span>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
        {value && (
          <button
            type="button"
            onClick={clear}
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground"
            aria-label="Clear search"
          >
            <LucideX size={16} />
          </button>
        )}
      </div>
      <button type="submit" className="px-3 py-2 bg-sky-500 text-white rounded">
        Search
      </button>
    </form>
  );
}
