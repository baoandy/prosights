"use client";

import { Chat } from "@/components/chat";
import SideBar from "@/components/side-bar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full h-screen">
      <Chat />
      <SideBar />
    </div>
  );
}
