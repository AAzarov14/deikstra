import { FaPlusCircle } from 'react-icons/fa'
import { FaPencil, FaX } from 'react-icons/fa6'
import graphData from './Store';

const ContextMenu = () => {
    const { isOpen, x, y, nodeId } = graphData((state:any) => state.contextMenu);
    const closeContextMenu = graphData((state:any) => state.closeContextMenu);
    const selectNodeForConnection = graphData((state:any) => state.selectNodeForConnection);
    const openEditor = graphData((state:any) => state.openEditor);
    const deleteNode = graphData((state:any) => state.deleteNode);

    if (!isOpen) return null;


    
    return (
        <>
            <div onClick={closeContextMenu} style={{position: "absolute", width: "100%", height: "100%"}}>
            </div>
            <div id="contextMenu" style={{position: "fixed", left: x, top: y, zIndex: 1000}}>
                <button className='defBtn' onClick={(e) => {e.stopPropagation(); selectNodeForConnection(nodeId); closeContextMenu();}}>
                    <FaPlusCircle />
                    Добавить связь
                </button>
                <button className='defBtn' onClick={(e) => {e.stopPropagation(); openEditor(nodeId); closeContextMenu();}}>
                    <FaPencil />
                    Изменить связи
                </button>
                <button className='delBtn' onClick={(e) => {e.stopPropagation(); deleteNode(nodeId); closeContextMenu();}}>
                    <FaX />
                    Удалить точку ({nodeId})
                </button>
            </div>
        </>
    )
}

export default ContextMenu