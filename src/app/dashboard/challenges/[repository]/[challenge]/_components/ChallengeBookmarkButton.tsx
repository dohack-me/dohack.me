"use client"

import {Button} from "@/src/components/ui/button";
import React from "react";
import {BookmarkMinusIcon, BookmarkPlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useToast} from "@/src/hooks/use-toast";
import {createBookmark, deleteBookmark} from "@/src/lib/database/bookmarks";

export default function ChallengeBookmarkButton({hasBookmark, challengeId}: {
    hasBookmark: boolean,
    challengeId: string
}) {
    const router = useRouter()
    const {toast} = useToast()

    if (!hasBookmark) {
        return (
            <Button onClick={async () => {
                await createBookmark(challengeId)
                toast({
                    title: "Created bookmark.",
                    description: "You can now return to this challenge in the home menu.",
                })
                router.refresh()
            }}>
                <BookmarkPlusIcon/>
                <p>Create Bookmark</p>
            </Button>
        )
    } else {
        return (
            <Button onClick={async () => {
                await deleteBookmark(challengeId)
                toast({
                    title: "Deleted bookmark.",
                })
                router.refresh()
            }}>
                <BookmarkMinusIcon/>
                <p>Delete Bookmark</p>
            </Button>
        )
    }
}