'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <InputGroup className="mb-8 md:mb-12">
      <InputGroupInput
        placeholder="Pesquise..."
        id="search-input"
        defaultValue={searchParams?.get('q')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon size={'sm'} />
      </InputGroupAddon>
    </InputGroup>
  );
}
