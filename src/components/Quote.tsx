"use client";
import React, { useEffect, useState } from "react";

interface Quote {
  quote: string;
  author: string;
}

const fallbackQuotes: Quote[] = [
  {
    quote:
      "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { quote: "Growth and comfort do not coexist.", author: "Ginni Rommetty" },
  {
    quote: "Technology is best when it brings people together.",
    author: "Matt Mullenweg",
  },
  {
    quote:
      "The technology you use impresses no one. The experience you create with it is everything.",
    author: "Sean Gerety",
  },
  {
    quote:
      "The advance of technology is based on making it fit in so that you don’t really even notice it, so it’s part of everyday life.",
    author: "Bill Gates",
  },
  {
    quote: "If you’re offered a seat on a rocket ship, don’t ask what seat.",
    author: "Sheryl Sandberg",
  },
  {
    quote:
      "You can focus on things that are barriers or you can focus on scaling the wall or redefining the problem.",
    author: "Tim Cook",
  },
  { quote: "Don’t be afraid to change the model.", author: "Reed Hastings" },
  {
    quote: "Never trust a computer you can’t throw out a window.",
    author: "Steven Wozniak",
  },
  {
    quote: "Never let a computer know you’re in a hurry.",
    author: "Author Unknown",
  },
  {
    quote: "Hardware: The parts of a computer system that can be kicked.",
    author: "Jeff Pesis",
  },
  {
    quote:
      "Once a new technology rolls over you, if you’re not part of the steamroller, you’re part of the road.",
    author: "Stewart Brand",
  },
  {
    quote:
      "If it keeps up, man will atrophy all his limbs but the push-button finger.",
    author: "Frank Lloyd Wright",
  },
  {
    quote:
      "Technology is ruled by two types of people: those who manage what they do not understand, and those who understand what they do not manage.",
    author: "Mike Trout",
  },
  {
    quote:
      "Technology is like a fish. The longer it stays on the shelf, the less desirable it becomes.",
    author: "Andrew Heller",
  },
  {
    quote:
      "I just invent. Then I wait until man comes around to needing what I’ve invented.",
    author: "R. Buckminster Fuller",
  },
  {
    quote: "Computers have lots of memory but no imagination.",
    author: "Author Unknown",
  },
  {
    quote:
      "People who smile while they are alone used to be called insane until we invented smartphones and social media.",
    author: "Mokokoma Mokhonoana",
  },
  {
    quote: "I won’t be impressed with technology until I can download food.",
    author: "Author Unknown",
  },
  {
    quote: "Life was much easier when Apple and Blackberry were just fruits.",
    author: "Author Unknown",
  },
];

const Quote: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Select a random quote from the fallbackQuotes array
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    setQuote(fallbackQuotes[randomIndex]);
  }, []);

  if (!quote) {
    return <p>Loading...</p>;
  }

  return (
    <blockquote
      style={{
        fontStyle: "italic",
      }}
    >
      <p  style={{ marginBottom: "0.5rem", }}>{quote.quote}</p>
      <footer style={{ textAlign: "right", fontWeight: "bold" }}>
        — {quote.author}
      </footer>
    </blockquote>
  );
};

export default Quote;
