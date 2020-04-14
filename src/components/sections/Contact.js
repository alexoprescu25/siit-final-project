import React from 'react';

import '../styles/Contact.css';

function Contact() {
    return (
        <>
        <div className="formular">
        <form className="contact-form">
            <div className="first">
            <input 
                type="text"
                id="name"
                name="name"
                className="form-name"
                placeholder="Name"
            />
            <input 
                type="text"
                id="phone"
                name="phone"
                className="form-phone"
                placeholder="Phone"
            />
            </div>
            <div className="first">
            <input 
                type="text"
                id="email"
                name="email"
                className="form-email"
                placeholder="Email"
            />
            <input 
                type="text"
                id="company"
                name="company"
                className="form-company"
                placeholder="Company"
            />
            </div>
            <input 
                type="text"
                id="comments"
                name="comments"
                className="form-comments"
                placeholder="Comments"
            />
            <button className="send-button" type="submit">Send</button>
        </form>
        </div>
        </>
    );
}

export default Contact;