import React, { useEffect, useState, useRef } from 'react';
import { heaterKit, smoothPianoKit } from './Data';
import Keypad from './Keypad';
import Display from './Display';


function App() {
  const [display, setDisplay] = useState('Heater Kit');
  const [value, setValue] = useState(null);
  const [powerBtnClicked, setPowerBtnClicked] = useState(1);
  const [bankBtnClicked, setBankBtnClicked] = useState(0);
  const [powerOff, setPowerOff] = useState(null);

  const refs = {
    displayTextRef: useRef(null),
    volumeRef: useRef(null),
    bankRef: useRef(null)
  }

  useEffect(() => {
    document.onload = adjustVolume();
  });

  function changeSoundKit() {
    if (powerOff === true || powerOff === null) {
      refs.bankRef.current.setAttribute('disabled', true);
    } else {
      refs.bankRef.current.removeAttribute('disabled');
    }

    if (powerOff === false) {
      setBankBtnClicked(bankBtnClicked + 1);

      if (bankBtnClicked % 2 === 0) {
        refs.displayTextRef.current.innerHTML = 'Smooth Piano Kit';
        setDisplay(refs.displayTextRef.current.innerHTML);
      } else {
        refs.displayTextRef.current.innerHTML = 'Heater Kit';
        setDisplay(refs.displayTextRef.current.innerHTML);
      }
    }
  }

  function adjustVolume() {
    if (powerOff === false) {
      refs.volumeRef.current.removeAttribute('disabled');
    } else {
      refs.volumeRef.current.setAttribute('disabled', true);
    }

    let currentValue = refs.volumeRef.current.value;
    setValue(currentValue);
  }

  const keypadComponents = heaterKit.map(item => (
    <Keypad
      ref={refs}
      id={item.key}
      src={item.url}
      key={item.id}
      buttonId={item.id}
      keycode={item.keyCode}
      heaterKitKey={item.key}
      heaterKit={heaterKit}
      smoothPianoKit={smoothPianoKit}
      display={display}
      setDisplay={setDisplay}
      value={value}
      setValue={setValue}
      powerOff={powerOff}
      setPowerOff={setPowerOff}
      bankBtnClicked={bankBtnClicked}
      setBankBtnClicked={setBankBtnClicked}
    />));

  return (
    <div id='drum-machine'>
      <div id='left-div'>
        <div id='drum-elements'>
          {keypadComponents}
        </div>
      </div>
      <div id='right-div'>
        <Display
          ref={refs}
          changeSoundKit={changeSoundKit}
          adjustVolume={adjustVolume}
          display={display}
          setDisplay={setDisplay}
          value={value}
          setValue={setValue}
          powerBtnClicked={powerBtnClicked}
          setPowerBtnClicked={setPowerBtnClicked}
          powerOff={powerOff}
          setPowerOff={setPowerOff}
          bankBtnClicked={bankBtnClicked}
          setBankBtnClicked={setBankBtnClicked}
        />
      </div>
    </div>
  )
}

export default App;
