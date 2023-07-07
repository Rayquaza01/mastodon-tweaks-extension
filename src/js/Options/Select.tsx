import React from "react";

export interface SelectOptions {
    value: string
    label: string
}

export interface SelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: SelectOptions[]
    value: string
}

export function Select(props: SelectProps) {
    return (
        <select value={props.value} onChange={props.onChange}>
            { props.options.map(item => <option value={item.value} key={item.value}>{item.label}</option>) }
        </select>
    );
}
