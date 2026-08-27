import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
};

/**
 * Figure responsif dengan Next/Image + caption.
 * Sumber default menggunakan placeholder Unsplash; ganti dengan aset milik
 * Nahdi Tour (mis. /public/assets/...) untuk produksi.
 */
export default function ArticleImage({
  src,
  alt,
  caption,
  priority = false,
}: Props) {
  return (
    <figure className="not-prose my-10">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-primary-50 ring-1 ring-slate-200">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 704px"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 border-l-2 border-gold-500 pl-3 text-sm italic leading-relaxed text-slate600">
        {caption}
      </figcaption>
    </figure>
  );
}
