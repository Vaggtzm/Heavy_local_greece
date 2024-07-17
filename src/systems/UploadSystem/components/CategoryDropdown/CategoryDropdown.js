import React, {useState} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useTranslation} from "react-i18next";

const CategoryDropdown = ({name, categories, onSelectCategory, required, value, defaultChoice}) => {
    const [selectedCategory, setSelectedCategory] = useState(value||'');
    const { t } = useTranslation();

    const handleSelect = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category); // Notify parent component about the selected category
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={t(selectedCategory) || name}
            variant={"dark"}
            required={required}
            className={"bg-dark text-white"}
        >
            {(defaultChoice)&&
                <Dropdown.Item
                    className={"bg-dark text-white"}
                    key={"No sponsor"}
                    onClick={() => handleSelect("No sponsor")}
                >
                    {t(defaultChoice)}
                </Dropdown.Item>}
            {categories.map((category, index) => (
                <Dropdown.Item
                    className={"bg-dark text-white"}
                    key={index}
                    onClick={() => handleSelect(category)}
                >
                    {t(category)}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default CategoryDropdown;
