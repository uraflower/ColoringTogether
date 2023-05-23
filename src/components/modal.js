import React from 'react';

const Modal = (props) => {
    const { isOpened, close, header, onSubmit, isValid } = props;

    const handleClick = () => {

        if (isValid) {
            close();
            onSubmit();
        }
        else {
            alert("내용을 입력해주세요");
        }
    }

    return (
        <div className={isOpened ? "flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto h-full bg-black bg-opacity-60" : "hidden"}>
            {isOpened ? (
                <section className="mx-0 my-auto px-4 bg-white w-4/5 max-w-md rounded-md">
                    <header className="py-3 flex flex-row justify-between">
                        <span className="text-2xl font-bold">{header}</span>
                        <button
                            className=""
                            onClick={close}>X</button>
                    </header>
                    <main className="py-2">{props.children}</main>
                    <footer className="py-3 flex flex-row justify-end">
                        <div
                            className="bg-gray-100 rounded px-3 py-2 mx-3">
                            <button
                                onClick={close}>닫기</button>
                        </div>
                        <div
                            className="bg-indigo-500 rounded text-white px-3 py-2">
                            <button
                                onClick={handleClick}>확인</button>
                        </div>
                    </footer>
                </section>
            ) : null}
        </div>
    )
};

export default Modal;