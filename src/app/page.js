import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Welcome to Micro Loop</h2>
      <Link href="/dashboard">
        <Button variant="outline" size="lg">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
