import React from 'react';
import { Link } from 'react-router-dom';

const VoteBg = () => {
    return (
        <div>
            <div
                className="flex items-center justify-between">
                <div
                    className="text-3xl">
                    배경 투표
                </div>
                <button
                    className="px-6 py-2 text-white transition-colors duration-200 bg-indigo-400 rounded-full hover:bg-indigo-600">
                    시작
                </button>
            </div>
            <div
                className="shadow-[0px_0px_20px_0px_#00000014] rounded-2xl overflow-hidden">
                박스
            </div>
        </div>
    )
}

export default VoteBg;