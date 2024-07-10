import {Accordion, Button, Nav} from "react-bootstrap";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";

export function AccordionComponent({articles, loggedIn, isEarlyAccess}) {
    const { t } = useTranslation();
    const [activeKey, setActiveKey] = useState((articles?Object.keys(articles):[]).includes('earlyReleases')?'earlyReleases':'Collabs and Sponsorships');
    console.log(articles);

    const renderArticles = (articles, subCategory) => {
        return Object.keys(articles)
            .filter(article => !!articles[article].title)
            .map((articlelink, index) => {
                const article = articles[articlelink];
                if (!article) return null;

                return (
                    <div className="col-auto d-flex justify-content-evenly" key={index}>
                        <div className="card mb-4">
                            <div className="card-header">
                                {article.image && (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="card-img-top mb-2"
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div className="card-body">
                                {article.title}
                                <div className="card-text">
                                    <NavLink
                                        to={`/article${subCategory === 'earlyReleases' ? '/early' : ''}/${articlelink}`}
                                        className="btn btn-danger"
                                    >
                                        {t('readMore')}
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
    };

    const sortedKeys = articles?Object.keys(articles).sort():[];
    if (sortedKeys.includes('earlyReleases')) {
        sortedKeys.splice(sortedKeys.indexOf('earlyReleases'), 1);
        sortedKeys.unshift('earlyReleases');
    }

    return (
        (articles) ? (
            <div className="row bg-dark p-3">
                <div className="col-md-3 d-none d-md-block">
                    <Nav variant="pills" className="flex-column sticky-top" activeKey={activeKey}
                         onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                        {sortedKeys.map((subCategory, subIndex) => (
                            <Nav.Item key={subIndex}>
                                <Nav.Link eventKey={subCategory}>{t(`${subCategory}`)}</Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </div>
                <div className="col-md-9">
                    <Accordion className="bg-dark" activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                        {sortedKeys.map((subCategory, subIndex) => (
                            <Accordion.Item className="bg-dark" eventKey={subCategory} key={subIndex}>
                                <Accordion.Header>{t(`${subCategory}`)}</Accordion.Header>
                                <Accordion.Body className="row w-100 d-flex justify-content-evenly">
                                    {renderArticles(articles[subCategory] || {}, subCategory)}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            </div>
        ) : "Hello"
    );
}
