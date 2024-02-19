import React from 'react';
import  commentBox  from "commentbox.io";
import "./comment.css"

class PageWithComments extends React.Component {
    componentDidMount() {
        // Καλέστε τη συνάρτηση commentBox στο componentDidMount
        this.removeCommentBox = commentBox('5635373061373952-proj');
    }

    componentWillUnmount() {
        // Καλέστε την αφαίρεση του commentBox στο componentWillUnmount
        this.removeCommentBox();
    }

    render() {
        return (
            <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                    <div className="commentbox" />
                    </div>
                </div>

            </div>
</>
        );
    }
};

export default PageWithComments;
