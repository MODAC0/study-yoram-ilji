"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewCounterProps {
  postId: string;
  increment?: boolean;
}

export default function ViewCounter({
  postId,
  increment = true,
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const updateViews = async () => {
      try {
        if (increment) {
          // 조회수 증가
          const res = await fetch(`/api/views/${postId}`, { method: "POST" });
          const data = await res.json();
          setViews(data.views);
        } else {
          // 조회수만 조회
          const res = await fetch(`/api/views/${postId}`);
          const data = await res.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to update views:", error);
        setViews(0);
      }
    };

    updateViews();
  }, [postId, increment]);

  if (views === null) {
    return (
      <span className="flex items-center gap-1 text-sm text-gray-500">
        <Eye className="w-4 h-4" />
        <span className="animate-pulse">...</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 text-sm text-gray-500">
      <Eye className="w-4 h-4" />
      <span>{views.toLocaleString()}</span>
    </span>
  );
}
