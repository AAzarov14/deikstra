import { motion } from 'framer-motion'
import { useState } from 'react'
import graphData from './Store'

interface nodeData{
    id: string,
    data: any,
    wRef: any
}

const Node = ({ id, data, wRef }:nodeData) => {
    const updatePos = graphData((state:any) => state.updateNodePos)
    const [offsetX, setOffsetX] = useState(0)
    const [offsetY, setOffsetY] = useState(0)

    const openContextMenu = graphData((state:any) => state.openContextMenu);
    const currentTool = graphData((state:any) => state.currentTool);
    const delNode = graphData((state:any) => state.deleteNode);

    const handleContextMenu = (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        
        openContextMenu(id, e.clientX, e.clientY);
    };

    return (
        <motion.div className='node' drag dragConstraints={wRef} dragMomentum={false} style={{
        position: 'absolute',
        left: (data?.x || 0)-offsetX,
        top: (data?.y || 0)-offsetY,
        x: "-50%",
        y: "-50%",
        cursor: 'grab'
        }} onDragEnd={(_e:any, info:any) => {if (!info?.point?.x || !id) return; setOffsetX(offsetX+info.offset.x); setOffsetY(offsetY+info.offset.y);updatePos(id, data.x+info.offset.x, data.y+info.offset.y)}}
        onContextMenu={handleContextMenu}
        onClick={() => currentTool === "delete" && delNode(id)}
      >
            <p>{id}</p>
        </motion.div>
    )
}

export default Node