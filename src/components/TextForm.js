import React,{useState} from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
//import PropTypes from 'prop-types'
export default function TextForm(props) {
    const [text,setText]=useState('');
    const {speak}=useSpeechSynthesis();
    const handleSpeech=()=>{
            speak({text:text});
            props.showAlert("Text to Speech","success");
    }
    const handleUpClick =()=>{
        let newText=text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase","success");
    }
    const handleLowClick =()=>{
        let newText=text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase","success");
    }
    const handleClearClick =()=>{
        let newText="";
        setText(newText);
        props.showAlert("Text area has been cleared","success");

    }

    const handleOnChange =(event)=>{
        setText(event.target.value);
    }
    const handleCopy =()=>{
        navigator.clipboard.writeText(text);
        //document.getSelection().removeAllRanges();
        props.showAlert("Copied to clipboard","success");
    }
    const handleWhiteSpaces =()=>{
        let newText=text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Removed extra spaces","success");
    }

  return (
    <div>
    <div className="container" style={{color: props.mode==='light'?'#212529':'white'}}>
    <h2 className='mb-4'>{props.heading}</h2>
    <div className="my-3">
    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='light'?'#f8f9fa':'#212529', color: props.mode==='light'?'#212529':'white' }} id="myBox" rows="8"></textarea>
    </div>
    <div className='btn-toolbar'>
    <button disabled={text.length===0} className="btn btn-outline-primary mx-2 my-1" onClick={handleLowClick}>Convert to Lower Case</button>
    <button disabled={text.length===0} className="btn btn-outline-primary mx-2 my-1" onClick={handleUpClick}>Convert to Upper Case</button>
    <button disabled={text.length===0} className="btn btn-outline-primary mx-2 my-1" onClick={handleCopy}>Copy Text</button>
    <button disabled={text.length===0} className="btn btn-outline-primary mx-2 my-1" onClick={()=>{handleSpeech()}}>Speech</button>
    <button disabled={text.length===0} className="btn btn-outline-primary mx-2 my-1" onClick={handleWhiteSpaces}>Remove Extra Spaces</button>
    <button disabled={text.length===0} className="btn btn-secondary mx-2 my-2" onClick={handleClearClick}>Clear Text Area</button>
    </div>
    </div>

    <div className='container my-3' style={{color: props.mode==='light'?'#212529':'white'}}>
    <h2>{props.heading2}</h2>
    <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.trim().length} characters</p>
    <p>{0.008 * text.split(/\s+/).filter((element)=>{return element.length!==0}).length } minutes read.</p>
    <h3>Preview</h3>
    <p>{text.length>0?text:"Nothing to preview here..."}</p>
    </div>
    </div>
  );
}
