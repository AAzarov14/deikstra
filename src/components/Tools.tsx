import { useState } from 'react'
import { FaMousePointer } from 'react-icons/fa'
import { FaTrashCan } from 'react-icons/fa6'
import graphData from './Store'

const Tools = () => {
    const selectTool = {left: '0', right: "unset"}
    const deleteTool = {left: "unset", right: '0'}

    const [position, setPosition] = useState(selectTool)

    const setTool = graphData((state:any) => state.setCurrentTool);

    return (
        <div className='roundMenu' onClick={() => {setTool(); setPosition(position.left === selectTool.left ? deleteTool : selectTool)}}>
            <div id='activeTool' style={position}></div>
            <FaMousePointer size={16} style={{zIndex: 2}}/>
            <FaTrashCan size={16} style={{zIndex: 2}}/>
        </div>
    )
}

export default Tools