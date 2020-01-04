import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

    const blankInput = {title: "", content:""};
    const [textInput, setTextInput] = useState(blankInput);
    const [isExpanded, setIsExpanded] = useState(false);
  
    function handleInputChange(event) {
        const {name, value} = event.target;
        setTextInput(prevTextInput => {
            return {...prevTextInput, [name]: value}});
    }

    function handleFormSubmit(event) {
        props.onAdd(textInput);
        setTextInput(blankInput);
        event.preventDefault();
    }

    function expand() {
        setIsExpanded(true);
    }

    return (
        <div >
            <form className="create-note">
                {isExpanded && <input name="title" placeholder="Title"  onChange= {handleInputChange} value={textInput.title}/>}
                <textarea name="content" placeholder="Take a note..." rows={isExpanded? "3" : "1"} onChange= {handleInputChange} value={textInput.content} 
                onClick= {expand}/>
                <Zoom in={isExpanded}>
                    <Fab onClick= {handleFormSubmit}>
                        <AddIcon />
                    </Fab>
                </Zoom>
                
            </form>
        </div>
    );
}

export default CreateArea;