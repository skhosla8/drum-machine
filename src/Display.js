import React, { forwardRef } from 'react';

const Display = forwardRef(function Display(props, ref) {
    const { displayTextRef, volumeRef, bankRef } = ref;

    const handlePowerState = () => {
        props.setPowerBtnClicked(props.powerBtnClicked + 1);

        if (props.powerBtnClicked === 1 || props.powerBtnClicked % 2 === 1) {
            props.setPowerOff(false);
        } else {
            props.setPowerOff(true);
        }

        if (props.powerOff === false) {
            displayTextRef.current.innerHTML = '';
        } else {
            displayTextRef.current.innerHTML = props.display;
        }
    }

    return (
        <div id='display-wrapper'>
            Power
            <div id="power-button">
                <label className="switch">
                    <input type="checkbox" id="checkbox"></input>
                    <span id="power-slider" className="slider" onClick={() => { handlePowerState() }}></span>
                </label>
            </div>
            <div id="display">
                <div ref={displayTextRef} id="display-text"></div>
            </div>
            <input ref={volumeRef} type="range" min="0" max="1" step="0.1" defaultValue="0.5" id="volume-control" className="range-slider" onChange={() => { props.adjustVolume() }} disabled></input>
            Bank
            <div id='bank'>
                <label className="switch">
                    <input ref={bankRef} type="checkbox" id="switch-2" className='disabled'></input>
                    <span id="bank-slider" className="slider" onClick={() => { props.changeSoundKit() }}></span>
                </label>
            </div>
        </div>
    )
});

export default Display;