import React from "react";
import { Spring } from 'react-spring/renderprops'

const VerticalProgress = ({ progress, roll }) => {
    return (
        <Spring from={{ percent: 0 }} to={{ percent: progress, roll: roll }}>
            {({ percent }) => (
                <div className="progress vertical">
                    <div style={{ height: `${percent}%` }} className={`progress-bar progress-bar-${roll}`}>
                        <span className="sr-only">{`${progress}%`}</span>
                    </div>
                </div>
            )}
        </Spring>
    );
};

export default VerticalProgress;
