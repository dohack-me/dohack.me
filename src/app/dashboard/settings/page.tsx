import {Card, CardDescription, CardHeader, CardTitle} from "@/src/components/ui/card";

export default async function SettingsPage() {
    return (
        <div className={"grow-col items-center justify-center"}>
            <Card>
                <CardHeader className={"text-center"}>
                    <CardTitle>Theres nothing here for now.</CardTitle>
                    <CardDescription>Come back later!</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}