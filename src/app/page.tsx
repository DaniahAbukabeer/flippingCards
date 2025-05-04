"use client";
// import Image from "next/image";
import Card from "@/components/Card";
import React from "react";
// import { CardData } from "../../types/cards";
import { cards } from "../../data/cards";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Halloo!</h1>
      <h5>This is a card matching game for ui/ux</h5>
      <div className="grid grid-cols-4 grid-rows-4 gap-4 mt-10">
        {cards.map((card) => (
          <Card
            key={card.id}
            ID={card.id.toString()}
            img={card.img}
          />
        ))}
      </div>
      </main>
  );
}
