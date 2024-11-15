"use client";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import dayjs from 'dayjs'
import { AlertDialogDemo } from "@/components/AlertBox";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/image");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [setPosts]);

  const deletePost = async (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
    try {
      const response = await fetch(`/api/deleteImage/${id}`, {
        method: "DELETE"
      })
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  const downloadPost = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download file from ${url}`);
      }
  
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = "ai-image.jpg"; 
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl); 
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full min-h-dvh p-3 pt-[72px] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {loading ? (
        <div className="col-span-full flex justify-center items-center">
          <BiLoaderCircle className="animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {posts.map((post, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="w-full h-fit border rounded-md p-2.5"
                key={post.id}
              >
                <div
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-72 w-full transition-all duration-300 ease-out",
                    hovered !== null &&
                      hovered !== index &&
                      "blur-sm scale-[0.98]"
                  )}
                >
                  <Image
                    alt={post.prompt}
                    src={post.url}
                    width={250}
                    height={250}
                    className="object-contain w-full rounded-md h-full"
                  />
                  <div
                    className={cn(
                      "justify-center absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
                      hovered === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 flex">
                      <AlertDialogDemo classes="bg-white text-black hover:bg-slate-600 hover:text-white" buttonText="Download" callBackFunct={downloadPost} id={post.url} confirmBtnClass="hover:bg-slate-500 hover:text-white" />
                      <AlertDialogDemo classes="ml-8 bg-white text-black hover:bg-red-600 hover:text-white" buttonText="Delete" callBackFunct={deletePost} id={post.id} confirmBtnClass="hover:bg-red-500 hover:text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-white/80">{post.prompt}</p>
                <p>{dayjs(post.createdAt).format('MMM D, YYYY h:mm A')}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}
