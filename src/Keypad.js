import React, { useEffect, useRef, forwardRef } from 'react';

const Keypad = forwardRef(function Keypad(props, ref) {
    const { displayTextRef } = ref;

    const btnBackgroundRef = useRef(props.buttonId);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    });

    const playSound = (element) => {
        const audio = document.getElementById(element);

        if (props.powerOff === false) {
            audio.volume = props.value;

            const smoothPianoUrl = props.smoothPianoKit
                .filter(item => item.key === audio.id)
                .map(item => item.url);

            const smoothPianoId = props.smoothPianoKit
                .filter(item => item.key === audio.id)
                .map(item => item.id);

            if (props.display === 'Smooth Piano Kit') {
                audio.setAttribute('src', smoothPianoUrl);
                audio.play();
                displayTextRef.current.innerHTML = smoothPianoId.toString().replace(/-/g, " ");
            } else {
                audio.setAttribute('src', props.src);
                audio.play();
                displayTextRef.current.innerHTML = props.buttonId.replace(/-/g, " ");
            }
        }
    }

    const handleKeyDown = (event) => {
        if (props.powerOff === false) {
            if (event.keyCode === props.keycode) {
                playSound(props.id);
                btnBackgroundRef.current.style.backgroundColor = btnBackgroundRef.current.classList.add(props.buttonId);
            }
        }
    }

    const handleKeyUp = (event) => {
        if (event.keyCode === props.keycode) {
            btnBackgroundRef.current.style.backgroundColor = btnBackgroundRef.current.classList.remove(props.buttonId);
        }
    }

    const handleOnMouseEnter = () => {
        if (props.powerOff === false) {
            btnBackgroundRef.current.style.backgroundColor = btnBackgroundRef.current.classList.add(props.buttonId);
        }
    }

    const handleOnMouseLeave = () => {
        btnBackgroundRef.current.style.backgroundColor = btnBackgroundRef.current.classList.remove(props.buttonId);
    }

    return (
        <button ref={btnBackgroundRef} id={props.buttonId} className='drum-pad' onClick={() => { playSound(props.id) }} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
            {props.heaterKitKey}
            <audio src='' className='clip' id={props.id} key={props.keyCode}>
            </audio>
        </button>
    )
});

export default Keypad;
