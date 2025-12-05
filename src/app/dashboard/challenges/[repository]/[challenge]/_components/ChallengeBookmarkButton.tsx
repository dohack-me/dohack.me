"use client"

import {Button} from "@/src/components/ui/button"
import React from "react"
import {BookmarkMinusIcon, BookmarkPlusIcon} from "lucide-react"
import {useRouter} from "next/navigation"
import {createBookmark, deleteBookmark} from "@/src/lib/database/bookmarks"
import {toast} from "sonner";

export default function ChallengeBookmarkButton({hasBookmark, challengeId}: {
    hasBookmark: boolean,
    challengeId: string
}) {
    const router = useRouter()

    if (!hasBookmark) {
        return (
            <Button onClick={async () => {
                await createBookmark(challengeId)
                toast.success("Created bookmark.", {
                    description: "You can now return to this challenge in the home menu.",
                })
                router.refresh()
            }}>
                <BookmarkPlusIcon/>
                <p className={"hidden lg:block"}>Create Bookmark</p>
                <p className={"hidden sm:block lg:hidden"}>Bookmark</p>
            </Button>
        )
    } else {
        return (
            <Button onClick={async () => {
                await deleteBookmark(challengeId)
                toast.success("Deleted bookmark.")
                router.refresh()
            }}>
                <BookmarkMinusIcon/>
                <p>Delete Bookmark</p>
            </Button>
        )
    }
}