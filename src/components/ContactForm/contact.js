import React from "react";

const Contact = ()=>{
    return(
        <>
        <form   action="https://formspree.io/f/xnqejvjp" method="POST">
    <h4>Get In touch</h4>
  <div className="form-group m-1">
    <label for="exampleInputEmail1">Tell us your feedback!</label>
    <input type="text" name="Subject" className="form-control m-1 p-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Θεμα" />
    <small id="emailHelp" className="form-text text-muted m-1 p-2">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <input type="text" className="form-control m-1 p-2" name="Message" id="exampleInputPassword1" placeholder="Μessage" />
  </div>
  <button type="submit" className="btn btn-primary m-1 p-2 w-100">Submit</button>

</form>
        </>
    )
}
export default Contact;