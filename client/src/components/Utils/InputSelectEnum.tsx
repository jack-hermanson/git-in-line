import React from "react";
import { Input } from "reactstrap";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
    value: number;
    id: string;
    enumMap: Map<number, string>;
}

export const InputSelectEnum: React.FC<Props> = ({
    onChange,
    value,
    id,
    enumMap,
}: Props) => {
    return (
        <Input id={id} type="select" value={value} onChange={onChange}>
            {Array.from(enumMap).map((enumItem) => (
                <option key={`${id}-${enumItem[0]}`} value={enumItem[0]}>
                    {enumItem[1]}
                </option>
            ))}
        </Input>
    );
};
