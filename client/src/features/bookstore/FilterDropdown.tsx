import { FormControl, MenuItem, Select } from "@mui/material";

interface Props {
    items: string[],
    onChange: (event: any) => void;
    selectedValue: string | undefined; 
}

export default function FilterDropdown({items, onChange, selectedValue}: Props) {
    return (
        <FormControl fullWidth>
            <Select value={selectedValue} onChange={onChange}>
                {items.map(value => (
                    <MenuItem value={value} key={value}>{value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}