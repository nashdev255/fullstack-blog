'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const postBlog = async (
    title: string | undefined,
    description: string | undefined
) => {
    const res = await fetch('http://localhost:3000/api/blog', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
    });
    return res.json();
};

const PostBlog = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.loading("uploading...", { id: "1" });
        await postBlog(titleRef.current?.value, descriptionRef.current?.value);
        toast.success("success!", { id: "1" });

        router.push("/");
        router.refresh();
    }

    return (
        <main className='w-full h-full'>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
                        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
                            ブログ新規作成
                        </h1>
                    </div>
                    <form
                    onSubmit={ handleSubmit }
                    className='bg-slate-300 p-4 rounded-lg'
                    >
                        <input
                        ref={ titleRef }
                        placeholder="タイトルを入力"
                        type="text"
                        className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <textarea
                        ref={ descriptionRef }
                        placeholder="内容を入力"
                        className="rounded-md px-4 py-2 w-full my-2"
                        rows={20}
                        ></textarea>
                        <button type="submit" className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            投稿
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
};

export default PostBlog;