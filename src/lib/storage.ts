"use server"

import {Challenge} from "@/src/lib/database/challenges"
import {minio} from "@/src/lib/globals";
import EnvironmentVariables from "@/src/lib/environment";

export type BucketFile = {
    name: string;
    size: number;
    etag: string;
    lastModified: Date;
}

export async function readChallengeFiles(challenge: Challenge): Promise<BucketFile[]> {
    return new Promise((resolve, reject) => {
        const files: BucketFile[] = []
        const stream = minio.listObjectsV2(EnvironmentVariables.MINIO_BUCKET, `${challenge.repository.id}/${challenge.id}`, true)
        stream.on("data", chunk => {
            if (!chunk.name) return
            files.push({
                name: chunk.name,
                size: chunk.size,
                etag: chunk.etag,
                lastModified: chunk.lastModified,
            })
        })
        stream.on("end", () => {
            resolve(files)
        })
        stream.on("error", (err) => {
            reject(err)
        })
    })
}

export async function getChallengeFileUrl(filePath: string) {
    return minio.presignedGetObject(EnvironmentVariables.MINIO_BUCKET, filePath, 60 * 60)
}

export async function getChallengeFileUploadUrl(filePath: string) {
    return minio.presignedPutObject(EnvironmentVariables.MINIO_BUCKET, filePath, 60 * 60)
}

export async function deleteChallengeFile(filePath: string) {
    await minio.removeObject(EnvironmentVariables.MINIO_BUCKET, filePath)
}