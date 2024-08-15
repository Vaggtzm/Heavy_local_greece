import React, { useState, useEffect } from "react";
import "./SideMenu.css"; // Ensure this CSS file exists

const SideMenu = ({ isMenuVisible }) => {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        { id: "top-news", label: "Top News" },
        { id: "explore-more", label: "Explore More" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            const newActiveSection = sections.find((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const elementTop = element.getBoundingClientRect().top + window.scrollY;
                    const elementHeight = element.offsetHeight;
                    return scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight;
                }
                return false;
            });

            setActiveSection(newActiveSection ? newActiveSection.id : null);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections]);

    return (
        <div className="side-menu d-none d-md-block" style={{
            top: isMenuVisible ? "36%" : "20%"
        }}>
            <ul className="side-menu-list">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className={activeSection === section.id ? "active" : ""}
                        >
                            {section.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenu;
