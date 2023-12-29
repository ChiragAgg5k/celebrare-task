"use client";
import React, {useEffect, useRef} from "react";
import { Inter } from 'next/font/google'
import {Roboto} from "next/font/google";
import {Poppins} from "next/font/google";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ weight: "100", subsets: ['latin']})
const poppins = Poppins({ weight: "100", subsets: ['latin']})

export default function NewText({
    containerRef,
    text,
    fontSize,
    fontFamily,
    color
                                }:{
    containerRef: React.RefObject<HTMLDivElement>;
    text: string;
    fontSize: number;
    fontFamily: string;
    color: string;
}){

    const boxRef = useRef<HTMLDivElement>(null);

    const isClicked = useRef<boolean>(false);

    const coords = useRef<{
        startX: number,
        startY: number,
        lastX: number,
        lastY: number
    }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    })

    useEffect(() => {
        if (!boxRef.current || !containerRef.current) return;

        const box = boxRef.current;
        const container = containerRef.current;


        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
        }

        const onMouseUp = (e: MouseEvent) => {
            isClicked.current = false;
            coords.current.lastX = box.offsetLeft;
            coords.current.lastY = box.offsetTop;
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;

            box.style.top = `${nextY}px`;
            box.style.left = `${nextX}px`;
        }

        box.addEventListener('mousedown', onMouseDown);
        box.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseUp);

        const cleanup = () => {
            box.removeEventListener('mousedown', onMouseDown);
            box.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseUp);
        }

        return cleanup;
    }, [containerRef])

    return (
        <div
            style={
                {
                    fontSize: `${fontSize}px`,
                    color: color
                }
            }
            ref={boxRef} className={`absolute top-4 left-4 border px-4 py-2 w-fit rounded-xl cursor-pointer`}>
            {
                fontFamily === "Inter" ? (
                    <span className={inter.className}>
                        {text}
                    </span>
                ) : fontFamily === "Roboto" ? (
                    <span className={roboto.className}>
                        {text}
                    </span>
                ) : fontFamily === "Poppins" ? (
                    <span className={poppins.className}>
                        {text}
                    </span>
                ) : null
            }
        </div>
    )
}
