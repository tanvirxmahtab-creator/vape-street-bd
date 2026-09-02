'use client';

import { PrismaHero } from "@/components/ui/prisma-hero";

export default function DemoOne({
  onNavigateProducts,
  onNavigateContact,
  onNavigateAbout,
  isLoaderFinished = true,
}: {
  onNavigateProducts?: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
  isLoaderFinished?: boolean;
}) {
  return (
    <PrismaHero
      onNavigateProducts={onNavigateProducts}
      onNavigateContact={onNavigateContact}
      onNavigateAbout={onNavigateAbout}
      isLoaderFinished={isLoaderFinished}
    />
  );
}
