import { cn } from "../../util/cn";
import type { IclassName } from "../../util/className";
import { FriendsFeed } from "./Moments/FriendsFeed";
import { LearningStats } from "./Moments/LearningStats";
import { PostStatus } from "./Moments/PostStatus";

export function MomentsWindow({ className = "" }: IclassName) {
  return (
    <div className={cn("p-8 w-full h-full overflow-y-auto bg-gray-50", className)}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">朋友圈</h1>

        {/* 个人统计 */}
        <div className="mb-8">
          <LearningStats />
        </div>

        {/* 发布动态 */}
        <PostStatus />

        {/* 好友动态 Feed */}
        <FriendsFeed />
      </div>
    </div>
  );
}