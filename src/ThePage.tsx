import {useState} from "react";

function ThePage() {

    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [notesText, setNotesText] = useState("No notes detected")
    const [classification, setClassification] = useState("No classification")

    const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
    };

    return (
        <div className={"w-screen h-screen bg-black text-white"}>
            <div className={"flex h-full justify-center items-center flex-col"}>
                <h1 className={"text-4xl font-bold p-16"}>Notes and Reminder Helper</h1>
                <div className={"w-full h-full px-64 py-16 flex flex-col gap-6"}>
                    <div className={"w-full flex flex-row gap-8 items-center justify-center"}>
                        {audioUrl && (
                            <audio controls className="mt-4 w-full max-w-md rounded-md">
                                <source src={audioUrl} type="audio/mpeg"/>
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        <div className="flex flex-col items-center gap-4 p-4">
                            <label
                                htmlFor="audio-upload"
                                className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
                            >
                                Upload Audio
                            </label>

                            <input
                                type="file"
                                id="audio-upload"
                                accept="audio/*"
                                className="hidden"
                                onChange={handleAudioUpload}
                            />
                        </div>
                    </div>
                    <div className={"flex flex-row gap-4 justify-start bg-gray-900 p-6 rounded-md"}>
                        <div className={"flex flex-col gap-1"}>
                            <p>Text</p>
                            <p>Category</p>
                        </div>
                        <div className={"flex flex-col gap-1"}>
                            <p>: {notesText}</p>
                            <p>: {classification}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ThePage;