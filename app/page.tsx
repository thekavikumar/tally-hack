import { ModeToggle } from "@/components/ModeToggle";
import { Username } from "@/components/Username";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Username />
      <ModeToggle />
    </main>
  );
}
