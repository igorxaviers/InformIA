import Image from "next/image";

export interface AuthorProps {
  name: string;
  avatarUrl?: string;
  className?: string;
}

export function Author({ name, avatarUrl, className }: AuthorProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {avatarUrl && (
        <Image
          src={avatarUrl}
          overrideSrc={avatarUrl}
          alt={name}
          width={24}
          height={24}
          unoptimized={true}
          className="w-6 h-6 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
        />
      )}
      <div>
        <div className="font-medium text-zinc-900 dark:text-zinc-100">{name}</div>
      </div>
    </div>
  );
}