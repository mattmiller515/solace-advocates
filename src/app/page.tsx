"use client";

import { AdvocatesTable } from "@/components/widgets/AdvocatesTable";

export default function Home() {
  return (
    <main className="m-8">
      <h1 className="text-2xl font-bold mb-4">Solace Advocates</h1>
      <AdvocatesTable />
    </main>
  );
}
