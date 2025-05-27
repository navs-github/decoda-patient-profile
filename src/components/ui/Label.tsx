import React from 'react'

type Props = {
    slug: string;
}

function Label({ slug }: Props) {
    return (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {slug}
        </label>
    )
}

export default Label 
