"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

export function Products() {
  return (
    <section id="products" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our Products"
          title="One platform, a growing family of AI products"
          description="Each product is trained and tuned for a single job, so it actually gets good at that job — instead of being generically okay at everything."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.title} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
