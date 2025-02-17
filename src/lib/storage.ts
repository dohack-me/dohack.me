"use server"

import {Challenge} from "@/src/lib/database/challenges"
import {S3} from "@/src/lib/globals";
import {ListObjectsV2Command, DeleteObjectCommand, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

export type BucketFile = {
    path: string
    name: string
    size: number
    etag: string
    lastModified: Date
}

export async function readChallengeFiles(challenge: Challenge): Promise<BucketFile[]> {
    const command = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET!,
        Prefix: `${challenge.repository.id}/${challenge.id}`
    })
    const response = await S3.send(command)
    if (!response.Contents) return []
    return response.Contents
        .filter((file) => !(file.Key!.endsWith(".emptyFolderPlaceholder")))
        .map((file) => ({
            path: file.Key!,
            name: file.Key!.split("/")[2],
            size: file.Size!,
            etag: file.ETag!,
            lastModified: file.LastModified!,
        }))
}

export async function getChallengeFileDownloadUrl(filePath: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: filePath,
    })
    return await getSignedUrl(S3, command)}

export async function getChallengeFileUploadUrl(filePath: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: filePath,
    })
    return await getSignedUrl(S3, command)
}

export async function deleteChallengeFile(filePath: string) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: filePath
    })
    await S3.send(command)
}