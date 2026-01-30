import React, { useRef, useState } from 'react'
import Tools from './Tools'
import { FaPencil, FaX } from 'react-icons/fa6'
import Node from './Node'
import Link from './Link'
import graphData from './Store'
import LinkEditor from './LinkEditor'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const Workspace = () => {
    const wRef = useRef(null)

    const nodes = graphData((state:any) => state.nodes);
    const edges = graphData((state:any) => state.edges);

    const addNode = graphData((state:any) => state.addNode);

    const imageData = graphData((state:any) => state.bgImage)
    const setBgSrc = graphData((state:any) => state.setBgImageSrc)

    const [editorIsHidden, setEditorIsHidden] = useState(true)

    const toggleBgEditor = () => {
        setEditorIsHidden(editorIsHidden ? false : true)
    }

    const handleTableContext = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            e.preventDefault();

            const rect = e.currentTarget.getBoundingClientRect();

            addNode(e.clientX-rect.left, e.clientY-rect.top); 
        }
    };

    const updateBrightness = graphData((state:any) => state.setBrightness)

    const handleInputBrightness = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = Number(e.currentTarget.value);
        updateBrightness(newValue);
    };

    const updateScale = graphData((state:any) => state.setScale)

    const handleInputScale = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = Number(e.currentTarget.value);
        updateScale(newValue);
    };

    return (
        <div id='workspace' ref={wRef} onContextMenu={handleTableContext}>
            <motion.div drag dragConstraints={wRef} className={clsx('w-1/2', 'h-1/2', 'bgImgContainer', !imageData.src && 'hidden')} dragPropagation dragMomentum={false}>
                <img src={imageData.src ? imageData.src : ""} id='bgImg' className='object-contain' style={{filter: `brightness(${imageData.brightness})`,transform: `scale(${imageData.scale})`, zIndex: 1, pointerEvents: "none"}} ></img>
            </motion.div>
            {edges.map((link:any, index:number) => (
            <Link 
                key={`edge-${link.from}-${link.to}-${index}`} 
                from={link.from} 
                to={link.to} 
                weight={link.weight}
                direction={link.direction}
            />
            ))}

            {Object.entries(nodes).map(([id, node]) => (
            <Node 
                key={id} 
                id={id} 
                data={node} 
                wRef={wRef}
            />
            ))}

            <div className='roundMenu' id="bgEdit">
                <FaPencil onClick={toggleBgEditor} style={{cursor: "pointer"}}/>
                <FaX onClick={() => setBgSrc("")} style={{cursor: "pointer"}}/>
            </div>
            <Tools />
            <LinkEditor />
            <div className={clsx(editorIsHidden ? "scale-0" : "", "bgEditor")}>
                <label htmlFor='brightness'>Яркость:</label>
                <input type='range' min={0} max={2} step={0.1} onInput={handleInputBrightness} name='brightness'></input>
                <label htmlFor='scale'>Размер:</label>
                <input type='range' min={0} max={2} step={0.1} onInput={handleInputScale} name='scale'></input>
            </div>
        </div>
    )
}

export default Workspace