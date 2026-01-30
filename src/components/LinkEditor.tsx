import graphData from './Store'
import { FaArrowsRotate, FaX } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const LinkEditor = () => {
    const nodeId = graphData((state:any) => state.curNodeId);
    const allEdges = graphData((state: any) => state.edges);
    const updateEdge = graphData((state:any) => state.updateEdge);
    const deleteEdge = graphData((state:any) => state.deleteEdge);
    const closeLinkEditor = graphData((state:any) => state.closeLinkEditor);
    const editorIsOpen = graphData((state:any) => state.editorIsOpen.isOpen);
    const toggleDirection = graphData((state:any) => state.toggleDirection);

    const edges = allEdges.filter((e: any) => e.from === nodeId || e.to === nodeId);

    if (editorIsOpen){
    return (
        <>
            <div onClick={closeLinkEditor} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
            </div>
            <motion.div id="modalLinks">
                <h1>
                    Связи узла {nodeId}
                </h1>
                {edges.map((edge:any, i:number) => (
                    <div key={i} className="linkEditorDataEl">
                    <span className="ghostText">{edge.from === nodeId ? `→ ${edge.to}` : `← ${edge.from}`}</span>
                    
                    <input 
                        type="number" 
                        value={Math.abs(edge.weight)}
                        onChange={(e:any) => updateEdge(edge.from, edge.to, Math.abs(Number(e.target.value)))}
                        className='weightInputField'
                    />
                    
                    <button
                        onClick={() => toggleDirection(edge.from, edge.to)}
                    >
                        <FaArrowsRotate />
                    </button>

                    <button 
                        onClick={() => deleteEdge(edge.from, edge.to)}
                        className='delBtn'
                    >
                        <FaX />
                    </button>
                    </div>
                ))}
                {edges.length === 0 && <p className='ghostText'>Связей пока нет</p>}
            </motion.div>
        </>
    )
    }
    else{
        return null
    }
}

export default LinkEditor