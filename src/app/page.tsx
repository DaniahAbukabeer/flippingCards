"use client";
// import Image from "next/image";
import Card from "@/components/Card";
import React from "react";
import { useEffect, useState } from "react";
import { CardData } from "../../types/cards";
import { cards as originalCards } from "../../data/cards";
import confetti from "canvas-confetti";


function shuffleCards<T>(array: T[]): T[] {
  const newArray = [...array]; // don't mutate original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Home() {
  const [shuffledCards, setShuffledCards] = useState(originalCards);
  const [again, setAgain] = useState(false); // you can toggle this later with a button
  const [firstCard, setFirstCard] = useState<CardData | null>(null);
  const [secondCard, setSecondCard] = useState<CardData | null>(null);
  const [disableClick, setDisableClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const matchSound = new Audio("/sounds/Yippee.mp3");
  const larrySound = new Audio("sounds/larry.mp3");
  const wompSound = new Audio("sounds/womp.mp3");
  const youdiedSound = new Audio("sounds/YOUDIED.mp3");
  const backgroundSound = new Audio("sounds/background.mp3");
  useEffect(() => {
    const shuffled = shuffleCards(originalCards).map((card) => ({
      ...card,
      flipped: true,
    }));
    setShuffledCards(shuffled);

    // Hide cards after 3 seconds
    setTimeout(() => {
      setShuffledCards((prev) =>
        prev.map((card) => ({ ...card, flipped: false }))
      );
    }, 3000);
  }, [again]); // runs once on mount and again if `again` changes

  const handleCardClick = (clickedCard: CardData) => {
    // if (disableClick || clickedCard.flipped || clickedCard.matched) return;
    if (gameOver || disableClick || clickedCard.flipped || clickedCard.matched) return;

    if (clickedCard.idOfPair == 20) {
      setGameOver(true);
      larrySound.loop = true;
      larrySound.volume = 0.7;
      youdiedSound.loop = false;
      youdiedSound.volume = 1;
      youdiedSound.play();
      larrySound.play();
    }

    const updatedCards = shuffledCards.map((card) =>
      card.id === clickedCard.id ? { ...card, flipped: true } : card
    );
    setShuffledCards(updatedCards);

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else if (!secondCard) {
      setSecondCard(clickedCard);
      setDisableClick(true);

      setTimeout(() => {
        if (firstCard.idOfPair === clickedCard.idOfPair) {
          // ✅ It's a match — show confetti!
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
          });
          // Play sound
          matchSound.volume = 1;
          matchSound?.play();

          setShuffledCards((prev) =>
            prev.map((card) =>
              card.idOfPair === clickedCard.idOfPair
                ? { ...card, matched: true }
                : card
            )
          );
        } else {
          wompSound.play();
          // ❌ Not a match
          setShuffledCards((prev) =>
            prev.map((card) =>
              card.id === firstCard.id || card.id === clickedCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }

        setFirstCard(null);
        setSecondCard(null);
        setDisableClick(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const allMatched = shuffledCards.every((card) => card.matched);
    if (allMatched) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
      // Play sound
      matchSound.volume = 1;
      matchSound?.play();
    }
  }, [shuffledCards]);


  useEffect(()=>{
    backgroundSound.volume= 0.5;
    backgroundSound.play();
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 oi.className">
      {gameOver && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#000000aa] to-[#000000] opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="from-transparent bg-[#808080]/50 backdrop-blur-sm opacity-25 drop-shadow-2xl drop-shadow-black ">
              </div>
              <div className="flex flex-col justify-center items-center ">
                <h1 className="text-red-800 font-extrabold" style={{fontSize: "255px"}}>YOU DIED!</h1>
                <h2 className="text-red-950 font-extrabold" style={{fontSize: "50px"}}>LARRY KIDNAPPED YOU!!!</h2>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-4xl font-bold oi.className text-[#CAD1D8]">MATCH THE CARDS!!!</h1>
      <h1 className="text-2xl font-bold oi.className text-red-400">touch larry at your own risk!</h1>

      {/* <h5 className="oi-regular">This is a card matching game for ui/ux</h5> */}
      <div className="self-end me-48">
        <button
          className="bg-[#2F455C] cursor-pointer px-10 py-4 text-[#CAD1D8] font-bold rounded oi.className"
          onClick={() => setAgain(!again)}
        >
          Start Again?
        </button>
        {/* <p className="text-gray-500">Click the button to shuffle the cards</p> */}
      </div>
      <div className="grid grid-cols-5 grid-rows-3 gap-4 mt-10">
        {shuffledCards.map((card) => (
          <Card
            key={card.id}
            ID={card.id.toString()}
            img={card.img}
            flipped={card.flipped}
            // matched={card.matched}
            // idOfPair={card.idOfPair}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </main>
  );
}
