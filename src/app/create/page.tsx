"use client"
import React from 'react'
import { useState } from 'react'
import {useMutation} from "@tanstack/react-query"
import { supabase } from '@/supabase-client'
import { useRouter } from 'next/navigation'



const CreatePage = () => {
	const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // optional: you can require the user to be logged in
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      alert("Please log in first.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          // optionally you can also save user_id: user.id if you added that column
        },
      ]);

    setLoading(false);

    if (error) {
      alert(`Error creating post: ${error.message}`);
    } else {
      alert("Post created successfully!");
      router.push("/"); // redirect back to home or posts list
    }
  };


  return (
	<div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-950 shadow-md rounded-2xl p-8 w-full max-w-lg space-y-6 border border-gray-800"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-50">
          Create a New Post
        </h1>

        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-100">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Enter a post title"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-100">
            Content
          </label>
          <textarea
            id="content"
            required
            rows={5}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="Write something interesting..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 text-white py-2 rounded-md font-medium hover:bg-rose-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}

export default CreatePage