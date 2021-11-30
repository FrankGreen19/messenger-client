import React from 'react';

const Message = ({message, userName}) => {
    let backgroundColor = '';
    let messageAlign = '';

    if (message.userName === userName) {
        backgroundColor = '#9966CC';
        messageAlign = 'd-flex flex-row-reverse';
    } else {
        backgroundColor = '#6666FF';
        messageAlign = 'd-flex flex-row';
    }

    return (
        <div>
            <div className={messageAlign}>
                <div className="message mt-3"
                     style={{maxWidth: "30%"}}
                >
                    <span
                        className="text-light rounded p-2 w-auto"
                        style={{backgroundColor: backgroundColor}}>
                        {message.text}
                    </span>
                        <div className="text-muted mt-1">
                            <span>{message.userName}</span>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Message;