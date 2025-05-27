import React from "react"
import Label from "./Label"

type Props = {
    className?: string
    label: string
    labelIcon?: React.ReactNode
    detail: string | React.ReactNode
}

const TextDetail = ({ className, label, labelIcon, detail }: Props) => {
    return (
        <div className={`${className} flex flex-col`}>
            <div className="flex flex-row items-center space-x-1.5">
                {labelIcon && labelIcon}
                <Label slug={label} />
            </div>
            <div className="mt-1 text-body-2 text-gray-700">
                {detail}
            </div>
        </div>
    )
}

export default TextDetail 
