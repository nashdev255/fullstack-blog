'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const editBlog = async (
    title: string | undefined,
    description: string | undefined,
    id: number
) => {
    const res = await fetch('http://localhost:3000/api/blog/${id}', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, id }),
    });
    return res.json();
};

const EditPost = ({ params }: { params: { id: number } }) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.loading("uploading...", { id: "1" });
        await editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id);
        toast.success("success!", { id: "1" });

        router.push("/");
        router.refresh();
    }

    return (
        <>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                <div className='md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl'>
                    <h1 className="text-2xl text-slate-200 text-center font-bold">
                        ブログの編集 🚀
                    </h1>
                </div>
                <form onSubmit={ handleSubmit } className='bg-slate-300 p-4 rounded-lg'>
                    <input
                    ref={ titleRef }
                    placeholder="タイトルを入力"
                    type="text"
                    className="rounded-md px-4 w-full py-2 my-2"
                    />
                    <textarea
                    ref={ descriptionRef }
                    placeholder="記事詳細を入力"
                    className="rounded-md px-4 py-2 w-full my-2"
                    ></textarea>
                    <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                    更新
                    </button>
                    <button className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-300">
                    削除
                    </button>
                </form>
                </div>
            </div>
        </>
    )
};

export default EditPost;