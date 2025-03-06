"use server"

import {S3} from "@/src/lib/globals"
import {DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand} from "@aws-sdk/client-s3"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

export type BucketFile = {
    path: string
    name: string
    size: number
    etag: string
    lastModified: Date
}

export async function readFolderFiles(folderPath: string): Promise<BucketFile[]> {
    const command = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET!,
        Prefix: folderPath,
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

export async function getFileDownloadUrl(filePath: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: filePath,
        ResponseContentDisposition: `attachment; filename="${filePath.split("/").pop()}"`,
    })
    return await getSignedUrl(S3, command)
}

export async function getFileUploadUrl(filePath: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: filePath,
    })
    return await getSignedUrl(S3, command)
}

export async function deleteFolder(folderPath: string) {
    const files = await readFolderFiles(folderPath)
    for (const file of files) {
        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET!,
            Key: file.path,
        })
        await S3.send(command)
    }
}

export async function deleteFile(filePath: string) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: filePath,
    })
    await S3.send(command)
}