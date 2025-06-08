import {useState} from "react";

function ThePage() {

    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [notesText, setNotesText] = useState("No notes detected")
    const [classification, setClassification] = useState("No classification")
    const [loading, setLoading] = useState(false);
    const api = 'http://127.0.0.1:5000/predict'

    const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
    };

    const handleSubmit = async () => {
        const fileInput = document.getElementById('audio-upload') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('audio', file);
        setLoading(true);
        try {

            const response = await fetch(api, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Prediction failed');
            }

            const data = await response.json();



        } catch (error) {
            console.error(error);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className={"w-screen h-screen bg-black text-white"}>
            <div className={"flex h-full justify-center items-center flex-col"}>
                <h1 className={"text-4xl font-bold p-16"}>Notes and Reminder Helper</h1>
                <div className={"w-full h-full px-64 py-16 flex flex-col gap-6 items-center"}>
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
                                Upload Your Audio
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
                    {audioUrl && (
                        loading ? (
                            <div className="mt-4 flex items-center justify-center text-white font-bold py-2 px-4">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                    ></path>
                                </svg>
                                Loading...
                            </div>
                        ): (
                            <button
                                onClick={handleSubmit}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Extract Audio
                            </button>
                        )
                    )}
                    <div className={"flex flex-row gap-4 justify-start bg-gray-900 p-6 rounded-md w-full"}>
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
                <div className={"flex flex-col gap-2 justify-center text-center text-white p-16"}>
                    <p className={''}>2025. Developed by Jose, William, Phillip, and Tommy.</p>
                </div>
            </div>
        </div>
    );
}

export default ThePage;