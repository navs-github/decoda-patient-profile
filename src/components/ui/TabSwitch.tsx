import { Tab } from "@headlessui/react"
import { cn } from "@/lib/utils"

interface TabSwitchProps {
    label: string
    badge?: string
}

export function TabSwitch({ label, badge }: TabSwitchProps) {
    return (
        <Tab
            className={({ selected }) =>
                cn(
                    "p-2 focus:outline-none cursor-pointer flex items-center gap-2",
                    selected
                        ? "bg-blue-100 text-blue-900 font-semibold rounded-sm"
                        : "text-gray-600 font-normal"
                )
            }
        >
            <span className="text-body-2">{label}</span>
            {badge && (
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-blue-200 text-blue-800 font-medium">{badge}</span>
            )}
        </Tab>
    )
} 
