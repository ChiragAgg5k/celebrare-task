"use client";
import {useRef, useState} from "react";
import NewText from "@/app/new-text";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedFontSize, setSelectedFontSize] = useState<number>(8);
    const [selectedFontFamily, setSelectedFontFamily] = useState<string>("Inter");
    const [texts, setTexts] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState<string>("");
    const [removedTexts, setRemovedTexts] = useState<string[]>([]);
    const [color, setColor] = useState<string>("white");
    const handleAddText = (text: string) => {
        setTexts([...texts, text]);
    }

    return (
        <main className={`grid grid-cols-1 md:grid-cols-3 place-items-center h-screen w-screen`}>
            <div className={`flex flex-col items-start space-y-4 p-4 h-full w-full mt-16`}>
                    <button className={`btn btn-outline w-full max-w-[256px]`} onClick={
                        () =>{
                            // remove last text
                            const newTexts = [...texts];
                            const removedText = newTexts.pop();
                            if (removedText) setRemovedTexts([...removedTexts, removedText]);
                            setTexts(newTexts);
                        }
                    }
                    disabled={texts.length === 0}
                    >
                        Undo
                    </button>
                    <button className={`btn btn-outline w-full max-w-[256px]`} onClick={
                        () =>{
                            // remove last text
                            const newTexts = [...texts];
                            const removedText = removedTexts.pop();
                            if (removedText) setTexts([...newTexts, removedText]);
                            setRemovedTexts(newTexts);
                        }
                    }
                    disabled={removedTexts.length === 0}
                    >
                        Redo
                    </button>
            </div>
            <div ref={containerRef}
                 className="relative border border-gray-400 rounded-xl h-[800px] w-full overflow-hidden">
                {
                    texts.map((text, i) => (
                        <NewText key={i} containerRef={containerRef} text={text} fontSize={
                            selectedFontSize
                        }
                        fontFamily={selectedFontFamily}
                        color={color}
                        />
                    ))
                }
            </div>
            <div className={`flex flex-col h-full items-start space-y-4 w-full p-6 mt-8`}>
                <div className={`w-full`}>
                <h3
                className={`font-bold text-lg mb-2`}
                >
                    Font
                </h3>

                <select className={`select select-bordered w-full`}
                onChange={
                    (e) => {
                        setSelectedFontFamily(e.target.value);
                    }
                }
                >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                </select>

                </div>

                <div className={`flex w-full items-center justify-start pb-8`}>
                    <div className={`w-full mr-4`}>
                        <h3
                            className={`font-bold text-lg mb-2`}
                        >
                            Size
                        </h3>

                        <select className={`select select-bordered w-full`} onChange={
                            (e) => {
                                setSelectedFontSize(parseInt(e.target.value));
                            }
                        }>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="12">12</option>
                            <option value="14">14</option>
                            <option value="16">16</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className={`w-full`}>
                        <h3
                            className={`font-bold text-lg mb-2`}
                        >
                            Color
                        </h3>

                        <select className={`select select-bordered w-full`} onChange={
                            (e) => {
                                setColor(e.target.value);
                            }
                        }>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                </div>

                <hr className={`w-full pb-8 border-base-content/50`}/>

                <button className={`btn btn-accent btn-outline w-full`} onClick={
                    () => {
                        (document as any).getElementById("add_new_text")?.showModal();
                    }
                }>
                    Add Text
                </button>
            </div>

            <dialog id="add_new_text" className="modal">
            <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Text</h3>
                    <p className="py-4">Enter the text you want to add to the canvas.</p>
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            if (currentText === "") return;
                            handleAddText(currentText);
                            setCurrentText("");
                            (document as any).getElementById("add_new_text")?.close();
                        }
                    }>
                        <div className={`flex`}>
                            <input
                                value={currentText}
                                onChange={
                                    (e) => {
                                        setCurrentText(e.target.value);
                                    }
                                }
                                type="text" className="input input-bordered w-full mr-4" placeholder="Enter Text"/>
                            <button className="btn">Add</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className={`cursor-default`}>close</button>
                </form>
            </dialog>
        </main>
    );
}
