
"use client";

import { useId, useState } from "react";

const WORDS = ["MEGHA", "SYSTEMS"];

const IMAGES = [
    "/products/Neo.webp",
    "/products/kids2.webp",
    "/products/Kiddiez Pro.webp",
    "/products/Black Maxi.webp",
    "/products/Cubi Doorz.webp",
    "/products/Kiddiez.webp",
    "/products/Luron.webp",
    "/products/Maxi Pro.webp",
    "/products/Maxi.webp",
    "/products/Rove.webp",
    "/products/product.png",
    "/products/Premia.webp",
];

function InteractiveWord({
    word,
    row,
    startIndex,
    active,
    setActive,
}) {
    const uniqueId = useId().replace(/:/g, "");

    const viewWidth = 1400;
    const viewHeight = 280;

    const letterWidth = viewWidth / word.length;
    const fontSize = 300;

    return (
        <svg
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            preserveAspectRatio="xMidYMid meet"
            className="block h-auto w-full overflow-visible"
            role="img"
            aria-label={word}
        >
            <defs>
                {word.split("").map((letter, index) => {
                    const x = index * letterWidth + letterWidth / 2;

                    return (
                        <clipPath
                            key={index}
                            id={`${uniqueId}-clip-${index}`}
                            clipPathUnits="userSpaceOnUse"
                        >
                            <text
                                x={x}
                                y="230"
                                textAnchor="middle"
                                fontFamily="Arial Black, Arial, Helvetica, sans-serif"
                                fontSize={fontSize}
                                fontWeight="900"
                                textLength={letterWidth * 0.96}
                                lengthAdjust="spacingAndGlyphs"
                            >
                                {letter}
                            </text>
                        </clipPath>
                    );
                })}
            </defs>

            {word.split("").map((letter, index) => {
                const key = `${row}-${index}`;
                const isActive = active === key;

                const xStart = index * letterWidth;
                const xCenter = xStart + letterWidth / 2;

                return (
                    <g
                        key={key}
                        onMouseEnter={() => setActive(key)}
                        onMouseLeave={() => setActive(null)}
                        onClick={() =>
                            setActive(isActive ? null : key)
                        }
                        style={{ cursor: "pointer" }}
                    >
                        {/* Product image clipped inside the letter */}
                        <image
                            href={IMAGES[startIndex + index]}
                            x={xStart}
                            y={0}
                            width={letterWidth}
                            height={viewHeight}
                            preserveAspectRatio="xMidYMid slice"
                            clipPath={`url(#${uniqueId}-clip-${index})`}
                        />

                        {/* Thin letter outline */}
                        <text
                            x={xCenter}
                            y="230"
                            textAnchor="middle"
                            fontFamily="Arial Black, Arial, Helvetica, sans-serif"
                            fontSize={fontSize}
                            fontWeight="900"
                            textLength={letterWidth * 0.96}
                            lengthAdjust="spacingAndGlyphs"
                            fill="none"
                            stroke={isActive ? "#ffffff" : "#a8a8a8"}
                            strokeWidth={isActive ? "1.2" : "0.7"}
                            style={{
                                transition: "stroke 0.3s ease",
                                userSelect: "none",
                            }}
                        >
                            {letter}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export default function MeghaInteractiveSection() {
    const [active, setActive] = useState(null);

    return (
        <section
            aria-label="Megha Systems"
            className="relative w-full overflow-hidden bg-black"
        >
            <div className="mx-auto w-full max-w-[2000px] px-3 py-5 sm:px-6 lg:px-10">

                {/* MEGHA */}
                <div className="mx-auto w-[88%]">
                    <InteractiveWord
                        word={WORDS[0]}
                        row={0}
                        startIndex={0}
                        active={active}
                        setActive={setActive}
                    />
                </div>

                {/* SYSTEMS */}
                <div className="-mt-2 w-full sm:-mt-4 lg:-mt-6">
                    <InteractiveWord
                        word={WORDS[1]}
                        row={1}
                        startIndex={5}
                        active={active}
                        setActive={setActive}
                    />
                </div>

            </div>
        </section>
    );
}
