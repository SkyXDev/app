"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase-client"; // passt zu Ihrem Navbar-Import
import { format } from "date-fns";

type Post = {
  id: string;
  title: string | null;
  content: string;
  created_at: string | null;
  user_id?: string | null;
};

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      // hole title, content, created_at, id; sortiere neueste zuerst
      const { data, error: sbError } = await supabase
        .from("posts")
        .select("id, title, content, created_at, user_id")
        .order("created_at", { ascending: false });

      if (sbError) {
        setError(sbError.message);
        setPosts(null);
      } else {
        setPosts(data ?? []);
      }
      setLoading(false);
    };

    fetchPosts();
    // optional: Sie können hier ein realtime subscription hinzufügen, wenn Sie möchten
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
		{loading && (
          <div className="text-center py-12">讀取中…</div>
        )}
		{error && (
          <div className="bg-red-900/60 border border-red-800 text-red-200 p-4 rounded-md">
            錯誤：{error}
          </div>
        )}
		{!loading && posts && posts.length === 0 && (
          <div className="text-center text-gray-400 py-12">目前沒有文章。</div>
        )}
		<div className="space-y-4">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="bg-gray-950 border border-gray-800 p-4 rounded-xl shadow-sm"
            >
              <header className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-medium">{post.title ?? "（無標題）"}</h2>
                <time className="text-xs text-gray-400">
                  {post.created_at
                    ? format(new Date(post.created_at), "yyyy-MM-dd HH:mm")
                    : ""}
                </time>
              </header>

              <p className="mt-3 text-sm leading-relaxed text-gray-200 whitespace-pre-wrap">
                {post.content}
              </p>
            </article>
          ))}
        </div>
	</div>
  );
};

export default BlogPage;
