import * as React from 'react';
import ToastText from './ToastText';
import classNames from 'classnames';

export type MessageProp =
    | React.ReactNode
    | string;

export type Position = 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type NotesType = 'default' | 'primary' | 'success' | 'warning' | 'alert' | 'highlight' | 'light';

export interface IMessageOptions {
    message?: MessageProp;
    id?: string;
    duration?: number | null;
    type?: NotesType;
    position?: Position;
    icon?: string;
}

interface IProps extends IMessageOptions {
    closeElement(id: string, position: Position): void;
}

export const ToastMessage = ({
    id,
    message,
    type,
    icon,
    duration,
    position,
    closeElement,
}: IProps) => {
    const [show, setShow] = React.useState();
    const [enter, setEnter] = React.useState(false);
    let timer = null;

    React.useEffect(() => {
        if (show === undefined) {
            setShow(true);
        }
        if (typeof duration === "number") {
            setEnter(true);
            timer = setTimeout(() => {
                close(id, position);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [enter]);

    function onMouseEnter() {
        clearInterval(timer);
    }

    function onMouseLeave() {
        setEnter(!enter);
    }

    function close(element: string, elementPosition: Position) {
        setShow(false);
        setTimeout(() => {
            closeElement(element, elementPosition);
        }, 400);
    }

    const classes = classNames('sd-toast', {
        [`sd-toast--${type}`]: type,
        ['sd-toast--enter']: show === undefined,
        ['sd-toast--enter-active']: show,
        ['sd-toast--exit-active']: !show,
    });

    return (
        <div
            className={classes}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ToastText id={id} title={message} icon={icon} onClose={() => close(id, position)} />
        </div>
    );
};
