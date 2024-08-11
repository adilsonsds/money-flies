import { useState } from "react";

export type CheckboxProps = {
    checked: boolean;
    onChange: () => void;
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    function toggle() {
        setIsChecked(!isChecked);
        onChange();
    }

    return (
        <input
            type="checkbox"
            checked={isChecked}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            onChange={toggle} />
    );
};
