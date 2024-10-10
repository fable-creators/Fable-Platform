"use client";

import React from "react";
import Link from "next/link";
import AnimatedSection from "../animated-section";

export default function ExploreSection() {
  return (
    <AnimatedSection>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-bold mb-4 text-plum dark:text-sky text-center text-glow text-glow-lg"
            style={
              {
                "--glow-color": "var(--grape)",
                "--glow-color-dark": "var(--sky)",
                "--shadow-color": "rgba(0, 0, 0, 0.3)",
              } as React.CSSProperties
            }
          >
            Explore endless adventures in the Fable universe
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-midnight dark:text-sky">
                Library
              </h3>
              <div className="bg-sand dark:bg-plum p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-plum dark:text-sky">
                  The Veil of Whispers
                </h4>
                <p className="text-sm mb-4 text-coffee dark:text-sky">
                  In the heart of the Fable universe lies a land known as the
                  Veil of Whispers, a mystical realm where the very air hums
                  with ancient secrets. The Veil is hidden from ordinary sight,
                  accessible only to those with a connection to the magic that
                  flows through the world. It is a place where the boundaries
                  between reality and imagination blur, where thoughts can take
                  shape, and where stories are not just told but lived.
                </p>
                <Link
                  href="/library/veil-of-whispers"
                  className="inline-block text-grape hover:text-midnight dark:text-sky dark:hover:text-sand transition-colors duration-200 underline"
                >
                  Read more
                  <span className="sr-only"> about The Veil of Whispers</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-midnight dark:text-sky">
                Join us
              </h3>
              <div className="bg-sand dark:bg-plum p-4 rounded-lg">
                <p className="text-sm mb-4 text-coffee dark:text-sky">
                  Step into the Fable universe, a realm where your imagination
                  holds the power to unfold enchanted worlds and weave epic
                  tales. Here, you&apos;re not just a participant, but a
                  creator, shaping stories that will resonate across generations
                  to come. Embrace the opportunity to craft your legacy in a
                  universe where every idea has the potential to become a
                  legend.
                </p>
                <Link
                  href="/join"
                  className="block w-full text-center bg-grape hover:bg-plum text-sky hover:text-sand dark:bg-sky dark:hover:bg-sand dark:text-midnight dark:hover:text-plum py-2 rounded transition-colors duration-200"
                >
                  Join the Fable Universe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
