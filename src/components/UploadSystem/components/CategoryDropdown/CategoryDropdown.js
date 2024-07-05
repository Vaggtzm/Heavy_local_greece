import React, {useState} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useTranslation} from "react-i18next";

const CategoryDropdown = ({categories, onSelectCategory, required, value}) => {
    const [selectedCategory, setSelectedCategory] = useState(value||'');
    const { t } = useTranslation();

    const handleSelect = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category); // Notify parent component about the selected category
    };

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={t(selectedCategory) || "Select a Category"}
            variant={"dark"}
            required={required}
            className={"bg-dark text-white"}
        >
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
