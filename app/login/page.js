"use client"

import { signIn } from "next-auth/react"

export default function Page() {

    const sign = async () => {
        const user = await signIn("credentials", {
            email: "AJ@sam.com",
            password: "AJ",
            callbackUrl: "/tool"
        })

        console.log(user);
    }

    return (
        <div className="m-50">
            <button onClick={sign}>Login</button>
        </div>
    )
}