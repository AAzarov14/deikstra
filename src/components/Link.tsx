import graphData from './Store';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface linkData{
    from:string,
    to:string,
    weight:number,
    direction:string
}

const Link = ({ from, to, weight, direction }:linkData) => {
    const start = graphData((state:any) => state.nodes[from]);
    const end = graphData((state:any) => state.nodes[to]);

    const lenght = Math.hypot(end.x - start.x, end.y - start.y);
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    const currentTool = graphData((state:any) => state.currentTool);
    const delEdge = graphData((state:any) => state.deleteEdge);

    return (
        <div style={{
            position: 'absolute',
            left: start.x,
            top: start.y,
            width: lenght,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0'
        }} className='link' onClick={() => currentTool === "delete" && delEdge(from, to)}>
            <p style={{position: "relative", bottom: 30, left: lenght/2, transform: `rotate(${-angle}deg)`, transformOrigin: 0}}>{weight}</p>
            {direction === "in" && <FaArrowLeft style={{position: "relative", bottom: 30, left: 15, color: "var(--accent1)"}}/>}
            {direction === "out" && <FaArrowRight style={{position: "relative", bottom: 30, left: lenght-30, color: "var(--accent2)"}}/>}
        </div>
    )
}

export default Link