import {requireUser} from "@/lib/auth";

export default async function SettingsPage() {
    return await requireUser(async(data) => {
        return (
            <p>Hello {data.email}</p>
        )
    })
}