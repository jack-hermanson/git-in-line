import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { ValueLabelPair } from "../../utils/utils";

interface Props {
    label: string;
    options: ValueLabelPair<number>[];
    selectedItems: number[];
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
    capitalizeLabels?: boolean;
}

export const FilterCheckboxes: React.FC<Props> = ({
    label,
    options,
    selectedItems,
    setSelectedItems,
    capitalizeLabels = false,
}: Props) => {
    return (
        <FormGroup>
            <Label className="form-label">{label}</Label>
            {options.map((option) => {
                const id = `${label}-option-${option.value}-${option.label}`;
                const alreadySelected = selectedItems.includes(option.value);
                return (
                    <FormGroup key={id} check>
                        <Input
                            type="checkbox"
                            checked={alreadySelected}
                            id={id}
                            onChange={(event) => {
                                const checked = event.target.checked;
                                if (checked && !alreadySelected) {
                                    setSelectedItems((s) => [
                                        ...s,
                                        option.value,
                                    ]);
                                }
                                if (!checked && alreadySelected) {
                                    setSelectedItems((s) =>
                                        s.filter((o) => o !== option.value)
                                    );
                                }
                            }}
                        />
                        <Label
                            for={id}
                            className={`form-check-label ${
                                capitalizeLabels ? "capitalize" : ""
                            }`}
                        >
                            {option.label}
                        </Label>
                    </FormGroup>
                );
            })}
        </FormGroup>
    );
};
