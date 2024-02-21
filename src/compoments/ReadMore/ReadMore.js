import React from "react";
import AcidMammoth from "./../../assets/AcidMammoth_main.jpg";
import ThyDarkenedShade from "./../../assets/thyDarkenedShade01.jpg";
import ADE from "./../../assets/ADE01.jpg";
const ReadMore = ()=>{
    return(
        <>
        <div className="container">
        <h4>Heavy Local Reviews</h4>
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="card p-4">
                <img className="card-img-top shadow-lg " src={AcidMammoth}></img>
                <h4 className="card-title">Echoes of Doom: Reflecting on Acid Mammoth's “Caravan”:Review(Eng)</h4>
                    <div className="card-body text-center">
                        <p className="lead">Intrigued by the sound of Acid Mammoth’s previous endeavor, “Under Acid Hoof”, I found myself drawn once more into the cavernous depths of their third big offering, “Caravan”.
Originating from Greece, a land more synonymous with stoner rock anthems than the brooding depths of heavy doom, Acid Mammoth defies expectations with their sophomore release.</p>
                       <a href="/article/Acid-Mammoth-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
            <div className="card p-4">
                <img className=" card-img-top shadow-lg" src={ThyDarkenedShade}></img>
                <h4 className="card-title"> Thy Darkened Shade:Review (Eng)</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        “Liber Lvcifer II: Mahapralaya” marks the highly anticipated second installment of Thy Darkened Shade’s theosophic trilogy, following their acclaimed debut “Liber Lvcifer I: Khem Sedjet.”
                        </p>
                       <a href="/article/Thy-Darkened-Shade-archive" className="btn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4">
            <div className="card text-center">
            <img className=" card-img-top shadow-lg" src={ADE}></img>
                <h4 className="card-title">ADE - Obolus :Review</h4>
                    <div className="card-body text-center">
                        <p className="lead">
                        Οι Ade είναι μια tech death metal μπάντα από την Ρώμη, την Ιταλική πρωτεύουσα,  η οποία ιδρύθηκε το 2007 και ασχολείται στα τραγούδια της με την αρχαία Ρωμαϊκή ιστορία. στοιχείο της παραδοσιακής πολεμικής Ρωμαϊκής μουσικής με την ταχύτητα, την τεχνικότητα και το brutal στοιχείο της death οι Ade δημιουργούν έναν επικό και σκληρό αλλά ταυτόχρονα προσεγμένο ήχο, ο οποίος παράλληλα και ψυχαγωγεί το αυτί και κάνει τον νου να μαθαίνει.
                        </p>
                       <a href="/article/ADE-Obulus-archive" className="btn btn-primary">Read More</a>

                    </div>

            </div>

          </div>
        <hr className="bg-dark" />

        </div>
        </div>
        </>
    )
}
export default ReadMore;