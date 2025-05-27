import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Sarah Johnson | Patient Profile",
}

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 
