import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default async function ImagesView() {
    return (
        <div className={"grid-view"}>
            <Card>
                <CardHeader>
                    <CardTitle>Testing Image</CardTitle>
                    <CardDescription>Testing Description</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}