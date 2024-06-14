import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-light pt-4">
            <div className="container overflow-hidden">
                <div className="row">
                    <div className="col-4">
                        <h5>All rights reserved</h5>
                        <p>Pulse Of The Underground 2024.</p>
                    </div>
                    <div className="col-4">
                        <h5 className={"text-center"}>Developed by</h5>
                        <p className={"text-center"}>Vaggelis Tzimas and <a className={"nav-link text-info"} href={"https://pavlos.orfanidis.net.gr"}>Pavlos Orfanidis</a></p>
                    </div>
                    <div className="col-4">
                        <h5>Help us to grow</h5>
                        <a href="https://www.buymeacoffee.com/tzimasvagg7" className="btn btn-primary w-100">Donate</a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;